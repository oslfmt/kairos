import Job from './Job.js';
import { connectHits } from 'react-instantsearch-dom';

// Component to display a row of 4 jobs
function JobDeck({ hits }) {
	return (
		<div className="card-deck">
			{hits.map(hit => (
				<Job key={hit.objectID} data={hit} />
			))}
		</div>
	);
}

const CustomHits = connectHits(JobDeck);
export default CustomHits;