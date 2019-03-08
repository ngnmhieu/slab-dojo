package de.otto.teamdojo.repository;

import de.otto.teamdojo.domain.TeamSkill;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TeamSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeamSkillRepository extends JpaRepository<TeamSkill, Long>, JpaSpecificationExecutor<TeamSkill> {

}
