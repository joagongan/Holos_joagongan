package com.HolosINC.Holos.Kanban;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.HolosINC.Holos.artist.ArtistService;
import com.HolosINC.Holos.exceptions.ResourceNotFoundException;

@Service
public class StatusKanbanOrderService {

    private StatusKanbanOrderRepository statusKanbanOrderRepository;
    private ArtistService artistService;

    @Autowired
    public StatusKanbanOrderService(StatusKanbanOrderRepository statusKanbanOrderRepository, ArtistService artistService) {
        this.statusKanbanOrderRepository = statusKanbanOrderRepository;
        this.artistService = artistService;
    }

    @Transactional
    public StatusKanbanOrder createStatusKanbanOrder(StatusKanbanOrder statusKanbanOrder) {
        return statusKanbanOrderRepository.save(statusKanbanOrder);
    }

    //Se pone el orden el último. Si no hay nada, el primero por defecto
    @Transactional
    public StatusKanbanOrder addStatusToKanban(String color, String description, String nombre, Integer artistId) {
        StatusKanbanOrder statusKanbanOrder = new StatusKanbanOrder();
        statusKanbanOrder.setColor(color);
        statusKanbanOrder.setDescription(description);
        statusKanbanOrder.setName(nombre);
        List<StatusKanbanOrder> list = statusKanbanOrderRepository.findByArtist(artistId);
        if(list.isEmpty()){
            statusKanbanOrder.setOrder(1);  
        }else{
            statusKanbanOrder.setOrder(list.size()+1);
        }
        statusKanbanOrder.setArtist(artistService.findArtist(artistId.longValue()));
        return statusKanbanOrderRepository.save(statusKanbanOrder);
    }

    // Duplicación introducida:
    @Transactional
    public StatusKanbanOrder addStatusToKanbanDuplicate(String color, String description, String nombre, Integer artistId) {
        StatusKanbanOrder statusKanbanOrder = new StatusKanbanOrder();
        statusKanbanOrder.setColor(color);
        statusKanbanOrder.setDescription(description);
        statusKanbanOrder.setName(nombre);
        List<StatusKanbanOrder> list = statusKanbanOrderRepository.findByArtist(artistId);
        if(list.isEmpty()){
            statusKanbanOrder.setOrder(1);  
        }else{
            statusKanbanOrder.setOrder(list.size()+1);
        }
        statusKanbanOrder.setArtist(artistService.findArtist(artistId.longValue()));
        return statusKanbanOrderRepository.save(statusKanbanOrder);
    }

    @Transactional
    public StatusKanbanOrder updateStatusKanbanOrder(StatusKanbanOrder statusKanbanOrder) {
        String color="";
        String description="";
        String nombre="";
        statusKanbanOrder.setColor(color);
        statusKanbanOrder.setDescription(description);
        statusKanbanOrder.setName(nombre);
        return statusKanbanOrderRepository.save(statusKanbanOrder);
    }

    @Transactional
    public StatusKanbanOrder updateKanban(int id, String color, String description, String nombre) {
        StatusKanbanOrder sk = statusKanbanOrderRepository.findById(id).get();
        sk.setColor(color);
        sk.setDescription(description);
        sk.setName(nombre);
        return statusKanbanOrderRepository.save(sk);
    }

    @Transactional
    public StatusKanbanOrder updateOrder(int id, Integer order) {
        StatusKanbanOrder sk = statusKanbanOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("StatusKanbanOrder", "id", id));
        if(sk.getOrder()==order){
            return statusKanbanOrderRepository.save(sk);
        }else{
            List<StatusKanbanOrder> list = statusKanbanOrderRepository.findByArtist(sk.getArtist().getId().intValue());
            for (StatusKanbanOrder sk2 : list) {
                    if(sk.getOrder()>order){
                        if(sk2.getOrder()>=order && sk2.getOrder()<sk.getOrder()){
                            sk2.setOrder(sk2.getOrder()+1);
                            statusKanbanOrderRepository.save(sk2);
                        }
                    }else{
                        if(sk2.getOrder()<=order && sk2.getOrder()>sk.getOrder()){
                            sk2.setOrder(sk2.getOrder()-1);
                            statusKanbanOrderRepository.save(sk2);
                        }
                    }
                }
                sk.setOrder(order);
        }return statusKanbanOrderRepository.save(sk);
    }

    @Transactional(readOnly = true)
    public StatusKanbanOrder findStatusKanbanOrder(Integer statusKanbanOrderId) {
        return statusKanbanOrderRepository.findById(statusKanbanOrderId).get();
    }

    @Transactional(readOnly = true)
    public List<StatusKanbanOrder> findAllStatusKanbanOrder() {
        return statusKanbanOrderRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<StatusKanbanOrder> findAllStatusKanbanOrderByArtist(Integer artistId) {
        return statusKanbanOrderRepository.findByArtist(artistId);
    }

    @Transactional
    public void deleteStatusKanbanOrder(Integer id) {
        StatusKanbanOrder statusToDelete = statusKanbanOrderRepository.findById(id).get();

        Integer artistId = statusToDelete.getArtist().getId().intValue();
        Integer orderDeleted = statusToDelete.getOrder();

        String color="";
        String description="";
        String nombre="";
        statusToDelete.setColor(color);
        statusToDelete.setDescription(description);
        statusToDelete.setName(nombre);

        statusKanbanOrderRepository.deleteById(id);

        List<StatusKanbanOrder> statusList = statusKanbanOrderRepository.findByArtist(artistId);

        for (StatusKanbanOrder status : statusList) {
            if (status.getOrder() > orderDeleted) {
                status.setOrder(status.getOrder() - 1);
                statusKanbanOrderRepository.save(status);
            }
        }
    }

    @Transactional
    public StatusKanbanOrder updateOrder(StatusKanbanOrder statusKanbanOrder) {
        return statusKanbanOrderRepository.save(statusKanbanOrder);
    }
}
