package de.otto.teamdojo.service.impl;

import de.otto.teamdojo.domain.TeamSkill;
import de.otto.teamdojo.repository.TeamSkillRepository;
import de.otto.teamdojo.service.OrganizationService;
import de.otto.teamdojo.service.TeamSkillService;
import de.otto.teamdojo.service.dto.TeamSkillDTO;
import de.otto.teamdojo.service.mapper.TeamSkillMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

/**
 * Service Implementation for managing TeamSkill.
 */
@Service
@Transactional
public class TeamSkillServiceImpl implements TeamSkillService {

    private final Logger log = LoggerFactory.getLogger(TeamSkillServiceImpl.class);

    private final TeamSkillRepository teamSkillRepository;

    private final TeamSkillMapper teamSkillMapper;

    private final OrganizationService organizationService;

    public TeamSkillServiceImpl(TeamSkillRepository teamSkillRepository, TeamSkillMapper teamSkillMapper,
                                OrganizationService organizationService) {
        this.teamSkillRepository = teamSkillRepository;
        this.teamSkillMapper = teamSkillMapper;
        this.organizationService = organizationService;
    }

    /**
     * Save a teamSkill.
     *
     * @param teamSkillDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TeamSkillDTO save(TeamSkillDTO teamSkillDTO) {
        log.debug("Request to save TeamSkill : {}", teamSkillDTO);
        if (teamSkillDTO.getVote() == null) {
            teamSkillDTO.setVote(0);
        }

        Integer requiredVotes = organizationService.getCurrentOrganization().getCountOfConfirmations();
        if (requiredVotes == null) {
            requiredVotes = 0;
        }

        if (teamSkillDTO.getVote() >= requiredVotes && teamSkillDTO.getVerifiedAt() == null) {
            teamSkillDTO.setVerifiedAt(Instant.now());
        }

        if (teamSkillDTO.getVote() < requiredVotes && teamSkillDTO.getVerifiedAt() != null) {
            teamSkillDTO.setVerifiedAt(null);
        }

        TeamSkill teamSkill = teamSkillMapper.toEntity(teamSkillDTO);
        teamSkill = teamSkillRepository.save(teamSkill);
        return teamSkillMapper.toDto(teamSkill);
    }

    /**
     * Get all the teamSkills.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TeamSkillDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TeamSkills");
        return teamSkillRepository.findAll(pageable)
            .map(teamSkillMapper::toDto);
    }


    /**
     * Get one teamSkill by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TeamSkillDTO> findOne(Long id) {
        log.debug("Request to get TeamSkill : {}", id);
        return teamSkillRepository.findById(id)
            .map(teamSkillMapper::toDto);
    }

    /**
     * Delete the teamSkill by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TeamSkill : {}", id);
        teamSkillRepository.deleteById(id);
    }
}
