package com.coop.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class PettyCashVoucherForm3 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String subHeading;
    private String name;
    private String voucherNo;

    private String amountInWordsRs;
    private String amountInWordsCts;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "voucher_id")
    private List<VoucherItemForm3> items = new ArrayList<>();
}
