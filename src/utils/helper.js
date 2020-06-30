export const blacksmithRepairingCostAfterPayingCommission = data => data.blacksmithRepairingCost * 1.01;

export const calculateAmountOfBattlesAfterOneRepairing = (durability, data) =>
  Math.round(durability * data.blacksmithRepairingCapacity + 0.49999999);

export const calculateCostOfRepairings = (amountOfRepairings, data) =>
  amountOfRepairings * data.costOfOneRepairing * blacksmithRepairingCostAfterPayingCommission(data);

export const calculateCostOfOneBattle = (amountOfBattles, costOfRepairings, data) =>
  (data.costOfBuying + costOfRepairings) / amountOfBattles;

export const calculateUnoptimizedAmountOfBattlesAndCostOfOneBattle = data => {
  let amountOfBattles = data.initialAmountOfBattles;
  for (let i = data.minimumArtifactDurability; i < data.maximumArtifactDurability; i++) {
    amountOfBattles += calculateAmountOfBattlesAfterOneRepairing(i, data);
  }

  const amountOfRepairings = data.maximumArtifactDurability - data.minimumArtifactDurability;
  const costOfRepairings = calculateCostOfRepairings(amountOfRepairings, data);
  const costOfOneBattle = calculateCostOfOneBattle(amountOfBattles, costOfRepairings, data);

  return { amountOfBattles: amountOfBattles, costOfOneBattle: costOfOneBattle };
}

export const calculateOptimizedMinimumArtifactDurabilityAndAmountOfBattles = data => {
  let currentAmountOfRepairings = 0;
  let currentArtifactDurability = data.maximumArtifactDurability - 1;
  let currentBestArtifactDurability = data.maximumArtifactDurability - 1;
  let currentAmountOfBattles = data.initialAmountOfBattles;
  let currentBestAmountOfBattles = 0;
  let currentCostOfOneBattle = 0;
  let currentBestCostOfOneBattle = 10000000;

  while(currentCostOfOneBattle <= currentBestCostOfOneBattle + data.epsilon) {
    currentAmountOfBattles += calculateAmountOfBattlesAfterOneRepairing(currentArtifactDurability--, data);
    currentCostOfOneBattle = calculateCostOfOneBattle(currentAmountOfBattles, calculateCostOfRepairings(++currentAmountOfRepairings, data), data);
    if(currentCostOfOneBattle < currentBestCostOfOneBattle) {
      currentBestArtifactDurability = currentArtifactDurability + 1;
      currentBestAmountOfBattles = currentAmountOfBattles;
      currentBestCostOfOneBattle = currentCostOfOneBattle;
    }
  }

  return {
    bestPrice: {
      artifactDurability: currentBestArtifactDurability,
      amountOfBattles: currentBestAmountOfBattles,
      costOfOneBattle: currentBestCostOfOneBattle
    },
    bestAmountOfBattles: {
      artifactDurability: currentArtifactDurability + 1,
      amountOfBattles: currentAmountOfBattles,
      costOfOneBattle: currentCostOfOneBattle
    }
  };
}

export const showData = (data, word, minimumArtifactDurability, amountOfBattles, costOfOneBattle) =>
  console.log(word + "result for durability from " + data.maximumArtifactDurability + " to " +
              minimumArtifactDurability + ":\namount of battles = " + amountOfBattles +
              "\ncost of one battle = " + costOfOneBattle);

export const showDifferentAmountsOfBattlesAndCostsOfOneBattle = data => {
  const unoptimizedResult = calculateUnoptimizedAmountOfBattlesAndCostOfOneBattle(data);
  const optimizedResult = calculateOptimizedMinimumArtifactDurabilityAndAmountOfBattles(data);

  showData(data, "unoptimized custom ",
           data.minimumArtifactDurability,
           unoptimizedResult.amountOfBattles,
           unoptimizedResult.costOfOneBattle);

  showData(data, "optimized by price ",
           optimizedResult.bestPrice.artifactDurability,
           optimizedResult.bestPrice.amountOfBattles,
           optimizedResult.bestPrice.costOfOneBattle);

  showData(data, `optimized by amount of battles with epsilon = ${data.epsilon} `,
           optimizedResult.bestAmountOfBattles.artifactDurability,
           optimizedResult.bestAmountOfBattles.amountOfBattles,
           optimizedResult.bestAmountOfBattles.costOfOneBattle);
}
