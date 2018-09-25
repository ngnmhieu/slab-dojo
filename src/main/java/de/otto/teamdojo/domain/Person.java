package de.otto.teamdojo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 2, max = 20)
    @Column(name = "name", length = 20, nullable = false)
    private String name;

    @NotNull
    @Size(min = 2, max = 20)
    @Column(name = "firstname", length = 20, nullable = false)
    private String firstname;

    @NotNull
    @Size(min = 3, max = 20)
    @Column(name = "mnemonic", length = 20, nullable = false)
    private String mnemonic;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "person_participations",
               joinColumns = @JoinColumn(name="people_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="participations_id", referencedColumnName="id"))
    private Set<Dimension> participations = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private Image image;

    @OneToMany(mappedBy = "person")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PersonSkill> skills = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Person name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstname() {
        return firstname;
    }

    public Person firstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getMnemonic() {
        return mnemonic;
    }

    public Person mnemonic(String mnemonic) {
        this.mnemonic = mnemonic;
        return this;
    }

    public void setMnemonic(String mnemonic) {
        this.mnemonic = mnemonic;
    }

    public Set<Dimension> getParticipations() {
        return participations;
    }

    public Person participations(Set<Dimension> dimensions) {
        this.participations = dimensions;
        return this;
    }

    public Person addParticipations(Dimension dimension) {
        this.participations.add(dimension);
        dimension.getPersonParticipants().add(this);
        return this;
    }

    public Person removeParticipations(Dimension dimension) {
        this.participations.remove(dimension);
        dimension.getPersonParticipants().remove(this);
        return this;
    }

    public void setParticipations(Set<Dimension> dimensions) {
        this.participations = dimensions;
    }

    public Image getImage() {
        return image;
    }

    public Person image(Image image) {
        this.image = image;
        return this;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public Set<PersonSkill> getSkills() {
        return skills;
    }

    public Person skills(Set<PersonSkill> personSkills) {
        this.skills = personSkills;
        return this;
    }

    public Person addSkills(PersonSkill personSkill) {
        this.skills.add(personSkill);
        personSkill.setPerson(this);
        return this;
    }

    public Person removeSkills(PersonSkill personSkill) {
        this.skills.remove(personSkill);
        personSkill.setPerson(null);
        return this;
    }

    public void setSkills(Set<PersonSkill> personSkills) {
        this.skills = personSkills;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Person person = (Person) o;
        if (person.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), person.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", firstname='" + getFirstname() + "'" +
            ", mnemonic='" + getMnemonic() + "'" +
            "}";
    }
}
