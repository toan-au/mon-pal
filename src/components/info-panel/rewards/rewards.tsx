import React, { useEffect, useState } from "react";
import { MonsterRewardType } from "../../../../types/api/api";

type propsType = {
  rewards: MonsterRewardType[];
};

type rankType = "LR" | "HR" | "MR";
const ranks: rankType[] = ["LR", "HR", "MR"];
const carveConditionIds = [
  1, 2, 3, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
];
const breakConditionIds = Array.from({ length: 33 }, (_, index) => index + 4);
const investigationIds = [50, 51, 52];

function filterRank(rewards: MonsterRewardType[], rank: rankType) {
  return rewards.filter((reward) => reward.rank === rank.toUpperCase());
}

function Rewards(props: propsType) {
  const [rankSelection, setRankSelection] = useState<rankType>("MR");
  const [rankRewards, setRankRewards] = useState<MonsterRewardType[]>([]);
  const [breakRewards, setBreakRewards] = useState<MonsterRewardType[]>([]);
  const [carveRewards, setCarvesRewards] = useState<MonsterRewardType[]>([]);
  const [investigationRewards, setInvestigationsRewards] = useState<
    MonsterRewardType[]
  >([]);

  // filter rewards based on selected rank
  useEffect(() => {
    setRankRewards(filterRank(props.rewards, rankSelection));
  }, [rankSelection, props]);

  // filter rank filtered rewards based on condition
  useEffect(() => {
    const carveRewards = rankRewards.filter((reward) =>
      carveConditionIds.includes(reward.condition_id)
    );
    setCarvesRewards(carveRewards);

    const investigationRewards = rankRewards.filter((reward) =>
      investigationIds.includes(reward.condition_id)
    );
    setInvestigationsRewards(investigationRewards);

    const breakRewards = rankRewards.filter((reward) =>
      breakConditionIds.includes(reward.condition_id)
    );
    setBreakRewards(breakRewards);
  }, [rankRewards]);

  function renderRewardsList(rewards: MonsterRewardType[]) {
    let condition = -1;

    return (
      <ul>
        {rewards.map((reward) => {
          // Print title of conditions
          let printTitle = false;
          if (condition != reward.condition_id) {
            condition = reward.condition_id;
            printTitle = true;
          }
          // print list items
          return (
            <>
              {printTitle && (
                <li className="font-bold">
                  {reward.monster_reward_condition_texts[0].name}
                </li>
              )}
              <li key={reward.id}>
                {reward.item.item_texts[0].name} | {reward.percentage}%
              </li>
            </>
          );
        })}
      </ul>
    );
  }

  return (
    <section id="rewards">
      <h3 className="text-2xl mb-2">Rewards</h3>
      <div id="rank-selectors" className="flex gap-5 mb-2">
        {ranks.map((rank) => (
          <button
            key={rank}
            onClick={() => setRankSelection(rank)}
            className={`p-5 ${
              rank == rankSelection ? "scale-110 bg-blue-300" : "bg-slate-300"
            }`}
          >
            {rank}
          </button>
        ))}
      </div>
      <div
        id="rewards-columns"
        className="flex flex-col justify-between md:flex-row"
      >
        <div>
          {/* <span className="font-bold">Carves</span> */}
          {renderRewardsList(carveRewards)}
        </div>
        <div>
          {/* <span className="font-bold">Rewards</span> */}
          {renderRewardsList(breakRewards)}
        </div>
        <div>
          {/* <span className="font-bold">Investigations</span> */}
          {renderRewardsList(investigationRewards)}
        </div>
      </div>
    </section>
  );
}

export default Rewards;