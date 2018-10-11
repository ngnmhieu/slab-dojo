package de.otto.teamdojo.service.impl;

import de.otto.teamdojo.service.PersonSkillService;
import de.otto.teamdojo.domain.PersonSkill;
import de.otto.teamdojo.repository.PersonSkillRepository;
import de.otto.teamdojo.service.dto.PersonSkillDTO;
import de.otto.teamdojo.service.mapper.PersonSkillMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing PersonSkill.
 */
@Service
@Transactional
public class PersonSkillServiceImpl implements PersonSkillService {

    private final Logger log = LoggerFactory.getLogger(PersonSkillServiceImpl.class);

    private final PersonSkillRepository personSkillRepository;

    private final PersonSkillMapper personSkillMapper;

    public PersonSkillServiceImpl(PersonSkillRepository personSkillRepository, PersonSkillMapper personSkillMapper) {
        this.personSkillRepository = personSkillRepository;
        this.personSkillMapper = personSkillMapper;
    }

    /**
     * Save a personSkill.
     *
     * @param personSkillDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PersonSkillDTO save(PersonSkillDTO personSkillDTO) {
        log.debug("Request to save PersonSkill : {}", personSkillDTO);
        PersonSkill personSkill = personSkillMapper.toEntity(personSkillDTO);
        personSkill = personSkillRepository.save(personSkill);
        return personSkillMapper.toDto(personSkill);
    }

    /**
     * Get all the personSkills.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PersonSkillDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PersonSkills");
        return personSkillRepository.findAll(pageable)
            .map(personSkillMapper::toDto);
    }


    /**
     * Get one personSkill by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PersonSkillDTO> findOne(Long id) {
        log.debug("Request to get PersonSkill : {}", id);
        return personSkillRepository.findById(id)
            .map(personSkillMapper::toDto);
    }

    /**
     * Delete the personSkill by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PersonSkill : {}", id);
        personSkillRepository.deleteById(id);
    }
}
