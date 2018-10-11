package de.otto.teamdojo.service.impl;

import com.google.common.collect.Lists;
import de.otto.teamdojo.domain.Badge;
import de.otto.teamdojo.domain.Level;
import de.otto.teamdojo.domain.Person;
import de.otto.teamdojo.domain.Team;
import de.otto.teamdojo.repository.BadgeRepository;
import de.otto.teamdojo.repository.PersonRepository;
import de.otto.teamdojo.repository.SkillRepository;
import de.otto.teamdojo.repository.TeamRepository;
import de.otto.teamdojo.service.AchievableSkillService;
import de.otto.teamdojo.service.ActivityService;
import de.otto.teamdojo.service.PersonSkillService;
import de.otto.teamdojo.service.TeamSkillService;
import de.otto.teamdojo.service.dto.AchievableSkillDTO;
import de.otto.teamdojo.service.dto.TeamSkillDTO;
import de.otto.teamdojo.service.dto.PersonSkillDTO;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
public class AchievableSkillServiceImpl implements AchievableSkillService {

    private final Logger log = LoggerFactory.getLogger(AchievableSkillServiceImpl.class);

    private static final List<String> ALL_FILTER = Lists.newArrayList("COMPLETE", "INCOMPLETE");

    private final SkillRepository skillRepository;

    private final TeamRepository teamRepository;

    private final PersonRepository personRepository;

    private final BadgeRepository badgeRepository;

    private final TeamSkillService teamSkillService;

    private final PersonSkillService personSkillService;

    private final ActivityService activityService;

    public AchievableSkillServiceImpl(SkillRepository skillRepository,
                                      TeamRepository teamRepository,
                                      PersonRepository personRepository,
                                      BadgeRepository badgeRepository,
                                      TeamSkillService teamSkillService,
                                      PersonSkillService personSkillService,
                                      ActivityService activityService) {
        this.skillRepository = skillRepository;
        this.teamRepository = teamRepository;
        this.personRepository = personRepository;
        this.badgeRepository = badgeRepository;
        this.teamSkillService = teamSkillService;
        this.personSkillService = personSkillService;
        this.activityService = activityService;
    }

    @Override
    public Page<AchievableSkillDTO> findAllByTeamAndLevelAndBadge(Long teamId, List<Long> levelIds, List<Long> badgeIds, List<String> filter, Pageable pageable) {
        List<String> queryFilter = getQueryFilter(filter);
        return levelIds.isEmpty() && badgeIds.isEmpty()
            ? findAllTeamRelated(teamId, queryFilter, pageable)
            : queryRepository(teamId, levelIds, badgeIds, queryFilter, pageable);
    }

    @Override
    public Page<AchievableSkillDTO> findAllByPersonAndLevelAndBadge(Long personId, List<Long> levelIds, List<Long> badgeIds, List<String> filter, Pageable pageable) {
        List<String> queryFilter = getQueryFilter(filter);
        return levelIds.isEmpty() && badgeIds.isEmpty()
            ? findAllPersonRelated(personId, queryFilter, pageable)
            : queryRepositoryP(personId, levelIds, badgeIds, queryFilter, pageable);
    }

    private List<String> getQueryFilter(List<String> filter) {
        List<String> queryFilter = new ArrayList<>();
        if (filter.isEmpty()) {
            queryFilter.addAll(ALL_FILTER);
        } else {
            queryFilter.addAll(filter);
        }
        return queryFilter;
    }

    @Override
    public AchievableSkillDTO updateAchievableSkill(Long teamId, AchievableSkillDTO achievableSkill) throws JSONException {
        AchievableSkillDTO originSkill = skillRepository.findAchievableSkill(teamId, achievableSkill.getSkillId());

        TeamSkillDTO teamSkill = new TeamSkillDTO();
        teamSkill.setId((achievableSkill.getTeamSkillId() != null) ? achievableSkill.getTeamSkillId() : originSkill.getTeamSkillId());
        teamSkill.setTeamId(teamId);
        teamSkill.setSkillId(achievableSkill.getSkillId());
        teamSkill.setCompletedAt(achievableSkill.getAchievedAt());
        teamSkill.setIrrelevant(achievableSkill.isIrrelevant());
        teamSkill = teamSkillService.save(teamSkill);

        if (teamSkill.getCompletedAt() != null) {
            activityService.createForCompletedSkill(teamSkill);
        }

        return skillRepository.findAchievableSkill(teamId, achievableSkill.getSkillId());
    }

    @Override
    public AchievableSkillDTO updateAchievablePersonSkill(Long personId, AchievableSkillDTO achievableSkill) throws JSONException {
        AchievableSkillDTO originSkill = skillRepository.findAchievablePersonSkill(personId, achievableSkill.getSkillId());

        PersonSkillDTO personSkill = new PersonSkillDTO();
        personSkill.setId((achievableSkill.getTeamSkillId() != null) ? achievableSkill.getTeamSkillId() : originSkill.getTeamSkillId());
        personSkill.setPersonId(personId);
        personSkill.setSkillId(achievableSkill.getSkillId());
        personSkill.setCompletedAt(achievableSkill.getAchievedAt());
        personSkill.setIrrelevant(achievableSkill.isIrrelevant());
        personSkill = personSkillService.save(personSkill);

        if (personSkill.getCompletedAt() != null) {
            activityService.createForCompletedPersonSkill(personSkill);
        }

        return skillRepository.findAchievableSkill(personId, achievableSkill.getSkillId());
    }

    public AchievableSkillDTO findAchievableSkill(Long teamId, Long skillId) {
        return skillRepository.findAchievableSkill(teamId, skillId);
    }

    public AchievableSkillDTO findAchievablePersonSkill(Long personId, Long skillId) {
        return skillRepository.findAchievablePersonSkill(personId, skillId);
    }

    private Page<AchievableSkillDTO> findAllTeamRelated(Long teamId, List<String> filter, Pageable pageable) {
        Team team = getTeam(teamId);
        List<Long> relatedLevelIds = getTeamRelatedLevelIds(team);
        List<Long> relatedBadgeIds = getTeamRelatedBadgeIds(team);
        relatedBadgeIds.addAll(getDimensionlessBadgeIds());
        return queryRepository(teamId, relatedLevelIds, relatedBadgeIds, filter, pageable);
    }

    private Page<AchievableSkillDTO> findAllPersonRelated(Long personId, List<String> filter, Pageable pageable) {
        Person person = getPerson(personId);
        List<Long> relatedLevelIds = getPersonRelatedLevelIds(person);
        List<Long> relatedBadgeIds = getPersonRelatedBadgeIds(person);
        relatedBadgeIds.addAll(getDimensionlessBadgeIds());
        return queryRepositoryP(personId, relatedLevelIds, relatedBadgeIds, filter, pageable);
    }

    private Team getTeam(Long teamId) {
        return teamRepository.findById(teamId).orElseThrow(NoSuchElementException::new);
    }

    private Person getPerson(Long personId) {
        return personRepository.findById(personId).orElseThrow(NoSuchElementException::new);
    }

    private Page<AchievableSkillDTO> queryRepository(Long teamId, List<Long> levelIds, List<Long> badgeIds, List<String> filter, Pageable pageable) {

        if (!levelIds.isEmpty() && !badgeIds.isEmpty()) {
            return skillRepository.findAchievableSkillsByLevelsAndBadges(teamId, levelIds, badgeIds, filter, pageable);
        } else if (!levelIds.isEmpty()) {
            return skillRepository.findAchievableSkillsByLevels(teamId, levelIds, filter, pageable);
        } else if (!badgeIds.isEmpty()) {
            return skillRepository.findAchievableSkillsByBadges(teamId, badgeIds, filter, pageable);
        }
        return Page.empty();
    }

    private Page<AchievableSkillDTO> queryRepositoryP(Long personId, List<Long> levelIds, List<Long> badgeIds, List<String> filter, Pageable pageable) {

        if (!levelIds.isEmpty() && !badgeIds.isEmpty()) {
            return skillRepository.findAchievableSkillsByPersonAndLevelsAndBadges(personId, levelIds, badgeIds, filter, pageable);
        } else if (!levelIds.isEmpty()) {
            return skillRepository.findAchievableSkillsByPersonAndLevels(personId, levelIds, filter, pageable);
        } else if (!badgeIds.isEmpty()) {
            return skillRepository.findAchievableSkillsByPersonAndBadges(personId, badgeIds, filter, pageable);
        }
        return Page.empty();
    }

    private List<Long> getTeamRelatedLevelIds(Team team) {
        return team.getParticipations()
            .stream()
            .flatMap(dimension ->
                dimension.getLevels().stream().map(Level::getId))
            .collect(Collectors.toList());
    }

    private List<Long> getTeamRelatedBadgeIds(Team team) {
        return team.getParticipations()
            .stream()
            .flatMap(dimension ->
                dimension.getBadges().stream().map(Badge::getId))
            .distinct()
            .collect(Collectors.toList());
    }

    private List<Long> getDimensionlessBadgeIds() {
        return badgeRepository.findAllByDimensionsIsNull()
            .stream()
            .map(Badge::getId)
            .collect(Collectors.toList());
    }

    private List<Long> getPersonRelatedLevelIds(Person person) {
        return person.getParticipations()
            .stream()
            .flatMap(dimension ->
                dimension.getLevels().stream().map(Level::getId))
            .collect(Collectors.toList());
    }

    private List<Long> getPersonRelatedBadgeIds(Person person) {
        return person.getParticipations()
            .stream()
            .flatMap(dimension ->
                dimension.getBadges().stream().map(Badge::getId))
            .distinct()
            .collect(Collectors.toList());
    }
}
