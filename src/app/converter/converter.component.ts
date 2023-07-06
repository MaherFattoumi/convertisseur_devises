import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Conversion {
  tauxReel: number;
  tauxSaisie: number;
  valeurInitiale: number;
  valeurCalculee: number;
  inputCurrency: string;
  outputCurrency: string;
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  tauxDeChange: number = 1.1;
  montantEur: number = 0;
  montantUsd: number = 0;
  montant: number = 0;
  inputCurrency: string = 'EUR';
  tauxDeChangeFixe: number = 0;
  historique: Conversion[] = [];

  ngOnInit() {
    setInterval(() => {
      const variation = Math.random() * 0.1 - 0.05;
      this.tauxDeChange += variation;
    }, 3000);
  }

  onChange() {
    const taux = (this.tauxDeChangeFixe != null && this.tauxDeChangeFixe !=0) ? this.tauxDeChangeFixe : this.tauxDeChange;
    if (this.inputCurrency === 'USD') {
      this.montantEur = +(this.montant * taux).toFixed(3);
    } else {
      this.montantUsd = +(this.montant * taux).toFixed(3);
    }
  }

  onChangeDevise() {
    const taux = (this.tauxDeChangeFixe != null && this.tauxDeChangeFixe !=0) ? this.tauxDeChangeFixe : this.tauxDeChange;
    if (this.inputCurrency === 'USD') {
      this.montant = this.montantUsd;
      this.montantEur = +(this.montant * taux).toFixed(3);
    } else {
      this.montant = this.montantEur;
      this.montantUsd = +(this.montant * taux).toFixed(3);
    }
  }

  convertir() {
    const taux = (this.tauxDeChangeFixe != null && this.tauxDeChangeFixe !=0) ? this.tauxDeChangeFixe : this.tauxDeChange;
    if (this.inputCurrency === 'USD') {
      this.montantEur = +(this.montant * taux).toFixed(3);
    } else {
      this.montantUsd = +(this.montant * taux).toFixed(3);
    }
    this.ajouterConversionHistorique();
  }

  ajouterConversionHistorique() {
    const tauxReel = this.tauxDeChange;
    const tauxSaisie = this.tauxDeChangeFixe;
    const valeurInitiale = this.montant;
    const valeurCalculee = this.inputCurrency === 'USD' ? this.montantEur : this.montantUsd;
    const inputCurrency = this.inputCurrency === 'USD' ? "USD" : "EUR";
    const outputCurrency = this.inputCurrency === 'USD' ? "EUR" : "USD";
    const conversion: Conversion = {
      tauxReel,
      tauxSaisie,
      valeurInitiale,
      valeurCalculee,
      inputCurrency,
      outputCurrency
    };

    this.historique.unshift(conversion);
    if (this.historique.length > 5) {
      this.historique.pop();
    }
  }
}
