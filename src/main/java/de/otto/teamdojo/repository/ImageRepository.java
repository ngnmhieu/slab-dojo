package de.otto.teamdojo.repository;

import de.otto.teamdojo.domain.Image;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


import java.util.Optional;

/**
 * Spring Data  repository for the Image entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImageRepository extends JpaRepository<Image, Long>, JpaSpecificationExecutor<Image> {

    Optional<Image> findByName(String name);
}
