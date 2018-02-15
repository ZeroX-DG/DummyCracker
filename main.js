function beginGeneratePassword() {
  // stop algorithm if running
  stopAlgorithm();
  for(let i = 1; i <= 10; i++) {
    generateRandomDigit(document.getElementById("random-pass-" + i));
  }
}

function generateRandomDigit(dom){
  let password_digit_dom = dom;
  password_digit_dom.style.color = "#3498db";
  let number_animation = setInterval(function() {
    password_digit_dom.innerText = randomInt(0, 9);
  }, 100);
  setTimeout(function() {
    clearInterval(number_animation);
    password_digit_dom.innerText = randomInt(0, 9);
    password_digit_dom.style.color = "black";
  }, 2000);
}

function getTarget() {
  let result = [];
  for(let i = 1; i <= 10; i++) {
    result.push(
      parseInt(document.getElementById("random-pass-" + i).innerText)
    );
  }
  return result;
}

let population;
let loop;
function startAlgorithm() {
  let max_population = parseInt(
    document.getElementById('max-population-field').value
  );
  let mutation_rate = parseFloat(
    document.getElementById('mutation-rate-field').value
  );
  let mixing_ratio = parseFloat(
    document.getElementById('mixing-ratio-field').value
  );
  let delay = parseInt(
    document.getElementById('delay-field').value
  );

  let target = getTarget();
  
  // create new population
  if (!population) {
    population = new Population(max_population, mutation_rate, mixing_ratio);
    // set new target
    population.setTarget(target);
    // initialize population with random password
    population.initialize();
  }
  
  // perform selection including calculating fitness and select first 50% best
  // password
  population.performSelection();
  // perform reproduction including cross over, mutation and refill population
  population.performReproduction();
  document.getElementById('best-pass').innerText = 
      population.best_members[0].gene.join(' ');
  
  document.getElementsByClassName('result')[0].style.display = 'block';
  loop = setInterval(function(){

    document.getElementById('generation').innerText = population.generation;
    document.getElementById('av-fitness').innerText = 
        population.averange_fitness + '%';

    if (!population.getMemberMatchedTarget()) {
      population.performSelection();
      population.performReproduction();
      document.getElementById('best-pass').innerText = 
        population.best_members[0].gene.join(' ');
    }
    else {
      document.getElementById('found-pass-message').style.display = "block";
      document.getElementById('found-pass').innerText = 
        population.getMemberMatchedTarget().gene.join(' ');
      clearInterval(loop);
    }
    
  }, delay);
}

function stopAlgorithm() {
  clearInterval(loop);
  document.getElementsByClassName('result')[0].style.display = 'none';
  document.getElementById('found-pass-message').style.display = "none";
  population = null;
}


// generate random password for every first visit
beginGeneratePassword();