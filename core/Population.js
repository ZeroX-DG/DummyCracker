class Population {
  constructor(max_population, mutation_rate, mixing_ratio) {
    this.max_population = max_population;
    this.mutation_rate = mutation_rate;
    this.mixing_ratio = mixing_ratio;
    this.target = [];
    this.members = [];
    this.best_members = [];
    this.generation = 1;
    this.matched_target = false;
    this.averange_fitness = 0;
  }

  setTarget(target) {
    this.target = target;
  }

  initialize() {
    for(let i = 0; i < this.max_population; i++) {
      this.members.push(new Password());
    }
  }

  calculateFitness() {
    for(let i = 0; i < this.members.length; i++) {
      this.members[i].calculateFitness(this.target);
    }

    let total_fitness = 0;

    for(let i = 0; i < this.members.length; i++) {
      total_fitness += this.members[i].fitness;
    }

    this.averange_fitness = Math.floor(
      total_fitness / this.members.length * 100
    );
  }

  performSelection() {
    this.best_members = [];
    this.calculateFitness();
    this.members.sort(function(a, b) {
      return b.fitness - a.fitness;
    });

    this.best_members = this.members.slice(0, this.members.length / 2);
  }

  performCrossOver() {
    for(let i = 0; i < this.members.length; i++) {
      let parent_1 = randomArray(this.best_members);
      let parent_2 = randomArray(this.best_members);

      // while(arrayEqual(parent_1.gene, parent_2.gene)) {
      //   parent_2 = randomArray(this.best_members);
      // }
      
      let new_child = parent_1.crossOver(parent_2, this.mixing_ratio);

      this.members[i] = new_child;
    }
  }

  performMutation() {
    for(let i = 0; i < this.members.length; i++) {
      this.members[i].mutate(this.mutation_rate);
    }
  }

  getMemberMatchedTarget() {
    for(let i = 0; i < this.members.length; i++) {
      if (arrayEqual(this.members[i].gene, this.target)) {
        return this.members[i];
      }
    }
    return false;
  }

  performReproduction() {
    this.performCrossOver();
    this.performMutation();
    this.generation++;
  }
}