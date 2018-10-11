package de.otto.teamdojo.service;

import de.otto.teamdojo.service.dto.PersonSkillDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing PersonSkill.
 */
public interface PersonSkillService {

    /**
     * Save a personSkill.
     *
     * @param personSkillDTO the entity to save
     * @return the persisted entity
     */
    PersonSkillDTO save(PersonSkillDTO personSkillDTO);

    /**
     * Get all the personSkills.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PersonSkillDTO> findAll(Pageable pageable);


    /**
     * Get the "id" personSkill.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PersonSkillDTO> findOne(Long id);

    /**
     * Delete the "id" personSkill.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
