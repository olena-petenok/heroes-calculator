import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './index.sass';
import { showDifferentAmountsOfBattlesAndCostsOfOneBattle } from '../../utils/helper.js';

function Index(props) {

  const [maximumArtifactDurability, setMaximumArtifactDurability] = useState(75);
  const [minimumArtifactDurability, setMinimumArtifactDurability] = useState(40);
  const [initialAmountOfBattles, setInitialAmountOfBattles] = useState(75);
  const [costOfOneRepairing, setCostOfOneRepairing] = useState(6400);
  const [costOfBuying, setCostOfBuying] = useState(150000);
  const [epsilon, setEpsilon] = useState(2);
  const [blacksmithRepairingCapacity, setBlacksmithRepairingCapacity] = useState(0.9);
  const [blacksmithRepairingCost, setBlacksmithRepairingCost] = useState(1.01);

  useEffect(() => {
    const data = {
      maximumArtifactDurability: maximumArtifactDurability,
      minimumArtifactDurability: minimumArtifactDurability,
      initialAmountOfBattles: initialAmountOfBattles,
      costOfOneRepairing: costOfOneRepairing,
      costOfBuying: costOfBuying,
      epsilon: epsilon,
      blacksmithRepairingCapacity: blacksmithRepairingCapacity,
      blacksmithRepairingCost: blacksmithRepairingCost
    };

    showDifferentAmountsOfBattlesAndCostsOfOneBattle(data);
  }, [maximumArtifactDurability, minimumArtifactDurability, initialAmountOfBattles,
      costOfOneRepairing, costOfBuying, epsilon, blacksmithRepairingCapacity, blacksmithRepairingCost]);

  return ( <section className=""><div>section</div></section> );
}

// Index.propTypes = {  };
// Index.defaultProps = {  };

export default Index;
