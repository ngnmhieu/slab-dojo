package de.otto.teamdojo.repository;

import de.otto.teamdojo.domain.Dimension;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Dimension entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DimensionRepository extends JpaRepository<Dimension, Long>, JpaSpecificationExecutor<Dimension> {

}
