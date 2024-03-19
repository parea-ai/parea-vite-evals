import { expect, test } from 'vitest'
import { p, greeting } from './greeting';


test('experiment', async () => {
  const e = p.experiment(
    'greetings',    // saved dataset name
    greeting             // function to evaluate
  );
  await e.run();
  Object.entries(e.avgScores).forEach(([scoreName, score]) => {
    expect(score, `Score ${scoreName} is too low`).toBeGreaterThanOrEqual(0.5);
  });
})
