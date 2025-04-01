package com.HolosINC.Holos.commision;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.HolosINC.Holos.Kanban.StatusKanbanOrder;
import com.HolosINC.Holos.commision.DTOs.ClientCommissionDTO;
import com.HolosINC.Holos.commision.DTOs.CommissionDTO;

@Repository
public interface CommisionRepository extends JpaRepository<Commision, Long>{
    
    @Query("SELECT COUNT(c) FROM Commision c WHERE c.artist.id = :artistId AND c.status = 'ACCEPTED'")
    Integer numSlotsCovered(Long artistId);

    @Query("SELECT s FROM StatusKanbanOrder s WHERE s.artist.id = :artistId AND s.order = (SELECT MIN(s.order) FROM StatusKanbanOrder s)")
    Optional<StatusKanbanOrder> getFirstStatusKanbanOfArtist(Long artistId);

    @Query("SELECT new com.HolosINC.Holos.commision.DTOs.CommissionDTO(c.id, c.name, c.description, c.price, c.status, c.paymentArrangement, c.milestoneDate, c.artist.baseUser.username, c.client.baseUser.username, c.image, c.client.baseUser.imageProfile)" +
    " FROM Commision c WHERE c.artist.baseUser.id = :artistId AND c.status IN :permitted")
    List<CommissionDTO> findCommisionsFilteredByArtistIdAndPermittedStatus(Long artistId, List<StatusCommision> permitted);

    @Query("SELECT new com.HolosINC.Holos.commision.DTOs.CommissionDTO(c.id, c.name, c.description, c.price, c.status, c.paymentArrangement, c.milestoneDate, c.artist.baseUser.username, c.client.baseUser.username, c.image, c.artist.baseUser.imageProfile)" +
    " FROM Commision c WHERE c.client.baseUser.id = :clientId AND c.status IN :permitted")
    List<CommissionDTO> findCommisionsFilteredByClientIdAndPermittedStatus(Long clientId, List<StatusCommision> permitted);

    @Query(" SELECT new com.HolosINC.Holos.commision.DTOs.ClientCommissionDTO(c.image, c.name, c.artist.baseUser.username, c.statusKanbanOrder.order,0, c.artist.baseUser.imageProfile)"+
        "FROM Commision c WHERE c.client.baseUser.id = :clientId")
    List<ClientCommissionDTO> findCommissionsInProgressByClient(Long clientId);

    @Query(" SELECT new com.HolosINC.Holos.commision.DTOs.ClientCommissionDTO(c.image, c.name, c.artist.baseUser.username, c.statusKanbanOrder.order,0, c.client.baseUser.imageProfile)"+
        "FROM Commision c WHERE c.artist.baseUser.id = :artistId")
    List<ClientCommissionDTO> findCommissionsInProgressByArtist(Long artistId);

    @Query("SELECT c FROM Commision c WHERE c.client.id = :clientId")
    List<Commision> findAllByClientId(Long clientId);
}
