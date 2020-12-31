import Job from './Job';

// Component to display a row of 4 jobs
export default function JobDeck(props) {
	const jobs = props.jobs.map((job) =>
		<Job key={job._id} jobData={job}/>
	);

	return (
		<div className="card-deck">
			{jobs}
		</div>
	);
}