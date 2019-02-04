package de.otto.teamdojo.repository;

import de.otto.teamdojo.domain.BadgeSkill;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BadgeSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BadgeSkillRepository extends JpaRepository<BadgeSkill, Long>, JpaSpecificationExecutor<BadgeSkill> {

}
