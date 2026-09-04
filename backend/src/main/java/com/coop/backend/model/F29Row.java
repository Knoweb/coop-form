package com.coop.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "f29_rows")
public class F29Row {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String section;
    private String label;
    private String col1; 
    private String col2; 
    private String col3; 
    private String col4; 

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getSection() {
        return section;
    }
    public void setSection(String section) {
        this.section = section;
    }
    public String getLabel() {
        return label;
    }
    public void setLabel(String label) {
        this.label = label;
    }
    public String getCol1() {
        return col1;
    }
    public void setCol1(String col1) {
        this.col1 = col1;
    }
    public String getCol2() {
        return col2;
    }
    public void setCol2(String col2) {
        this.col2 = col2;
    }
    public String getCol3() {
        return col3;
    }
    public void setCol3(String col3) {
        this.col3 = col3;
    }
    public String getCol4() {
        return col4;
    }
    public void setCol4(String col4) {
        this.col4 = col4;
    }
}
