package com.HolosINC.Holos.commision;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.HolosINC.Holos.Kanban.StatusKanbanOrder;

@Repository
public interface CommisionRepository extends JpaRepository<Commision, Long>{
    
    @Query("SELECT COUNT(c) FROM Commision c WHERE c.artist.id = :artistId AND c.status = 'ACCEPTED'")
    Integer numSlotsCovered(Long artistId);

    @Query("SELECT s FROM StatusKanbanOrder s WHERE s.order = (SELECT MIN(s.order) FROM StatusKanbanOrder s)")
    Optional<StatusKanbanOrder> getFirstStatusKanbanOfArtist(Long artistId);

    @Query("SELECT c FROM Commision c WHERE c.artist.baseUser.id = :artistId AND c.status = 'REQUESTED'")
    List<Commision> findAllPendingCommisionsByArtistId(@Param("artistId") Long artistId);
}
