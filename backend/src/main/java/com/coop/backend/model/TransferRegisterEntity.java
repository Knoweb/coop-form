package com.coop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "transfer_register")
public class TransferRegisterEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;

    // Debit Side (බැරවිය යුතු ගිණුම් - Accounts to be Debited)
    // Note: The physical translation in Sri Lankan accounting can be tricky. 
    // Usually 'හර' = Debit, 'බැර' = Credit. The prompt indicates "Debit Side (බැරවිය යුතු ගිණුම්)", 
    // I will use debit* as requested in the field requirements for the left side.
    private String debitAccountNo;
    private String debitDescription;
    private Double debitSubTotal;
    private Double debitBalance;

    // Credit Side (හරවිය යුතු ගිණුම් - Accounts to be Credited)
    private String creditAccountNo;
    private String creditDescription;
    private Double creditSubTotal;
    private Double creditBalance;
}
