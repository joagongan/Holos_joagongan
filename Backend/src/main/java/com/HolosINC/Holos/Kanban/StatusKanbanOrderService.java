package com.HolosINC.Holos.Kanban;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.HolosINC.Holos.Kanban.DTOs.StatusKanbanDTO;
import com.HolosINC.Holos.Kanban.DTOs.StatusKanbanWithCommisionsDTO;
import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.artist.ArtistService;
import com.HolosINC.Holos.commision.Commision;
import com.HolosINC.Holos.commision.CommisionRepository;
import com.HolosINC.Holos.commision.StatusCommision;
import com.HolosINC.Holos.exceptions.AccessDeniedException;
import com.HolosINC.Holos.exceptions.ResourceNotFoundException;
import com.HolosINC.Holos.exceptions.ResourceNotOwnedException;
import com.HolosINC.Holos.model.BaseUserService;

@Service
public class StatusKanbanOrderService {


    private StatusKanbanOrderRepository statusKanbanOrderRepository;
    private ArtistService artistService;
    private BaseUserService userService;
    private CommisionRepository commisionRepository;


    @Autowired
    public StatusKanbanOrderService(StatusKanbanOrderRepository statusKanbanOrderRepository, ArtistService artistService, BaseUserService userService, CommisionRepository commisionRepository) {
        this.statusKanbanOrderRepository = statusKanbanOrderRepository;
        this.artistService = artistService;
        this.userService = userService;
        this.commisionRepository = commisionRepository;
    }

    @Transactional
    public StatusKanbanOrder createStatusKanbanOrder(StatusKanbanOrder statusKanbanOrder) {
        return statusKanbanOrderRepository.save(statusKanbanOrder);
    }

    //Se pone el orden el último. Si no hay nada, el primero por dewfecto

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
        StatusKanbanOrder sk = statusKanbanOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("StatusKanbanOrder", "id", id));
        sk.setColor(color);
        sk.setDescription(description);
        sk.setName(nombre);
        return statusKanbanOrderRepository.save(sk);
    }

    @Transactional
    public StatusKanbanOrder updateOrder(Long id, Integer order) {
        StatusKanbanOrder statusKanban = statusKanbanOrderRepository.findById(id.intValue())
                .orElseThrow(() -> new ResourceNotFoundException("StatusKanbanOrder", "id", id));
        if(sk.getOrder()==order){
            return statusKanbanOrderRepository.save(sk);
        }else{
            List<StatusKanbanOrder> list = statusKanbanOrderRepository.findByArtist(sk.getArtist().getId().intValue());
            //Recorro los statuskanban order de cada artista para recolocarlos
            for (StatusKanbanOrder sk2 : list) {
                    if(sk.getOrder()>order){
                        //Si el orden es mayor que el nuevo orden, tengo que bajar el resto sumándoles 1, hasta que lleguen a la posición del orden antiguo
                        if(sk2.getOrder()>=order && sk2.getOrder()<sk.getOrder()){
                            sk2.setOrder(sk2.getOrder()+1);
                            statusKanbanOrderRepository.save(sk2);
                        }
                    }else{
                        //Si el orden es menor que el nuevo orden, tengo que subir el resto restándoles 1, hasta que lleguen a la posición del orden antiguo
                        //No pueden ser iguales porque fuera he descartado ese caso
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
		return statusKanbanOrderRepository.findById(statusKanbanOrderId)
				.orElseThrow(() -> new ResourceNotFoundException("StatusKanbanOrder", "id", statusKanbanOrderId));
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

    @Transactional
    public Pair<List<StatusKanbanDTO>, List<StatusKanbanWithCommisionsDTO>> getAllStatusFromArtist() {
        try {
            Long artistId = userService.findCurrentUser().getId();
            List<StatusKanbanDTO> statuses =  statusKanbanOrderRepository.getAllStatusOrdererOfArtist(artistId);
            List<StatusKanbanWithCommisionsDTO> commisions = statusKanbanOrderRepository.getAllCommisionsAcceptedOfArtist(artistId);
            return Pair.of(statuses, commisions);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public Commision nextStatusOfCommision(Long id) {
        try {
            Long artistId = userService.findCurrentUser().getId();
            Commision c = commisionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comisión no encontrada"));
            if (artistId.equals(c.getArtist().getId()))
                throw new AccessDeniedException("No tienes permisos para cambiar esta comisión");

            StatusKanbanOrder thisStatus = statusKanbanOrderRepository.actualStatusKanban(id);
            Optional<StatusKanbanOrder> nextStatus = statusKanbanOrderRepository.nextStatusKanban(thisStatus.getArtist().getId(),
                                                                                                     thisStatus.getOrder() + 1);
            if (nextStatus.isEmpty()) {
                c.setStatusKanbanOrder(null);
                c.setStatus(StatusCommision.ENDED);
            } else 
                c.setStatusKanbanOrder(nextStatus.get());

            commisionRepository.save(c);
            return c;
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public Commision previousStatusOfCommision(Long id) throws Exception {
        try {
            Long artistId = userService.findCurrentUser().getId();
            Commision c = commisionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comisión no encontrada"));
            if (artistId.equals(c.getArtist().getId()))
                throw new ResourceNotOwnedException("No tienes permisos para cambiar esta comisión");

            StatusKanbanOrder thisStatus = statusKanbanOrderRepository.actualStatusKanban(id);
            Optional<StatusKanbanOrder> previousStatus = statusKanbanOrderRepository.nextStatusKanban(thisStatus.getArtist().getId(),
                                                                                                     thisStatus.getOrder() - 1);
            if (previousStatus.isEmpty()) {
                throw new Exception("No tienes un estado anterior para esta comisión");
            } else 
                c.setStatusKanbanOrder(previousStatus.get());

            commisionRepository.save(c);
            return c;
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw e;
        }
    }
}
