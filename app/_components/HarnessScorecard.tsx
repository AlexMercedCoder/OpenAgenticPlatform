import Link from 'next/link';
import { MAX_SCORE, opennessTests } from '../_data/openness';

/**
 * The openness scorecard as it applies to one harness. Shown on every
 * harness and broker technology page so readers can score their own
 * deployment of the tool with the same rubric as /openness-scorecard.
 */
export function HarnessScorecard({ name }: { name: string }) {
  return (
    <section className="kb-scorecard" id="openness-scorecard">
      <h2>Openness scorecard for {name}</h2>
      <p>
        The notes above describe the tool. The score belongs to your deployment of it, because configuration,
        permissions, and where records are kept decide most of the result. Score each test 0 (absent), 1 (partial),
        or 2 (demonstrated) for the way you run {name}, out of {MAX_SCORE}.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead>
            <tr>
              <th scope="col">Test</th>
              <th scope="col">Question</th>
              <th scope="col">What a 2 looks like</th>
              <th scope="col">Evidence to collect</th>
            </tr>
          </thead>
          <tbody>
            {opennessTests.map((test) => (
              <tr key={test.id}>
                <td><Link href={`/knowledge-base/${test.id}`}>{test.title}</Link></td>
                <td>{test.question}</td>
                <td>{test.rubric[2]}</td>
                <td>{test.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <Link href="/openness-scorecard">Score your {name} setup on the interactive scorecard</Link>. It runs in your
        browser, and you can download the result as JSON or print it.
      </p>
    </section>
  );
}
