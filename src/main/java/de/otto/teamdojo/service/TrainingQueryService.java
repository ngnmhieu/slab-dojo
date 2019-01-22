package de.otto.teamdojo.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import de.otto.teamdojo.domain.Training;
import de.otto.teamdojo.domain.*; // for static metamodels
import de.otto.teamdojo.repository.TrainingRepository;
import de.otto.teamdojo.service.dto.TrainingCriteria;

import de.otto.teamdojo.service.dto.TrainingDTO;
import de.otto.teamdojo.service.mapper.TrainingMapper;

/**
 * Service for executing complex queries for Training entities in the database.
 * The main input is a {@link TrainingCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TrainingDTO} or a {@link Page} of {@link TrainingDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TrainingQueryService extends QueryService<Training> {

    private final Logger log = LoggerFactory.getLogger(TrainingQueryService.class);

    private final TrainingRepository trainingRepository;

    private final TrainingMapper trainingMapper;

    public TrainingQueryService(TrainingRepository trainingRepository, TrainingMapper trainingMapper) {
        this.trainingRepository = trainingRepository;
        this.trainingMapper = trainingMapper;
    }

    /**
     * Return a {@link List} of {@link TrainingDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TrainingDTO> findByCriteria(TrainingCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Training> specification = createSpecification(criteria);
        return trainingMapper.toDto(trainingRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link TrainingDTO} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TrainingDTO> findByCriteria(TrainingCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Training> specification = createSpecification(criteria);
        return trainingRepository.findAll(specification, page)
            .map(trainingMapper::toDto);
    }

    /**
     * Function to convert TrainingCriteria to a {@link Specification}
     */
    private Specification<Training> createSpecification(TrainingCriteria criteria) {
        Specification<Training> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Training_.id));
            }
            if (criteria.getTitle() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTitle(), Training_.title));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), Training_.description));
            }
            if (criteria.getContactPerson() != null) {
                specification = specification.and(buildStringSpecification(criteria.getContactPerson(), Training_.contactPerson));
            }
            if (criteria.getLink() != null) {
                specification = specification.and(buildStringSpecification(criteria.getLink(), Training_.link));
            }
            if (criteria.getValidUntil() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getValidUntil(), Training_.validUntil));
            }
            if (criteria.getIsOfficial() != null) {
                specification = specification.and(buildSpecification(criteria.getIsOfficial(), Training_.isOfficial));
            }
            if (criteria.getSkillId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getSkillId(), Training_.skills, Skill_.id));
            }
        }
        return specification;
    }

}
