package de.otto.teamdojo.repository;

import de.otto.teamdojo.domain.Person;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Person entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    @Query(value = "select distinct person from Person person left join fetch person.participations",
        countQuery = "select count(distinct person) from Person person")
    Page<Person> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct person from Person person left join fetch person.participations")
    List<Person> findAllWithEagerRelationships();

    @Query("select person from Person person left join fetch person.participations where person.id =:id")
    Optional<Person> findOneWithEagerRelationships(@Param("id") Long id);

}
