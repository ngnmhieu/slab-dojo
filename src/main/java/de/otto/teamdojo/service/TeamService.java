package de.otto.teamdojo.service;

import de.otto.teamdojo.service.dto.TeamDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Team.
 */
public interface TeamService {

    /**
     * Save a team.
     *
     * @param teamDTO the entity to save
     * @return the persisted entity
     */
    TeamDTO save(TeamDTO teamDTO);

    /**
     * Get all the teams.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TeamDTO> findAll(Pageable pageable);

    /**
     * Get all the Team with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<TeamDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" team.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TeamDTO> findOne(Long id);

    /**
     * Delete the "id" team.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
