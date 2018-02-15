class Password {
  constructor(gene) {
    if (gene) {
      // if a gene is specified then create a new password
      // with that gene
      this.gene = gene;
    }
    else {
      // otherwise generate a new password with a random gene
      this.gene = this.generateRandomGene();
    }

    this.fitness = 0;
  }

  generateRandomGene() {
    let result = [];
    // loop for 10 times cus our password is only 10 digits long
    for (let i = 0; i < 10; i++) {
      result.push(randomInt(0, 9)); // randomInt in utility.js
    }
    return result;
  }

  calculateFitness(target) {

    for(let i = 0; i < target.length; i++) {
      if (this.gene[i] == target[i]) {
        this.fitness++;
      }
    }

    // return fitness as decimal
    this.fitness = this.fitness / target.length;
  }

  crossOver(partner, mix_ratio) {
    // we will use uniform crossover
    // which will need mixing ratio
    // we will use mixing ratio to decide which gene to pick
    // from (this gene or partner gene)

    let child_gene = [];

    for(let i = 0; i < this.gene.length; i++) {
      let random_number = Math.random();
      if (random_number < mix_ratio) {
        child_gene.push(this.gene[i]);
      }
      else {
        child_gene.push(partner.gene[i]);
      }
    }

    return new Password(child_gene);
  }

  mutate(mutation_rate) {
    // using mutation rate to mutate gene
    for(let i = 0; i < this.gene.length; i++) {
      let random_number = Math.random();
      if (random_number < mutation_rate) {
        this.gene[i] = randomInt(0, 9);
      }
    }
  }
}