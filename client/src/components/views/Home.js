import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import JobDeck from '../JobDeck';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			jobs: []
		};
	}

	componentDidMount() {
		axios.get('http://localhost:4000/')
			.then(res => {
				this.setState({
					jobs: res.data
				});
			})
			.catch(err => console.error(err));
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-sm bg-light flex-row-reverse p-4">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="#">How It Works</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="#">Advantages</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="#">Log In</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/signup">Sign Up</Link>
						</li>
					</ul>
				</nav>

				{/* Main section */}
				<section id="main">
        	<div className="container mt-4">
          	<div className="jumbotron bg-transparent">
              <div className="row align-items-center">
                <div className="col-8">
                  <h1 className="display-2 pr-3">Collancer</h1>
                </div>
								<div className="col-4">
										<a href="signup.html" className="btn btn-lg btn-primary">Join</a>
								</div>
              </div>
              <div className="row pl-5">
								<h2 className="display-5">Freelancing For the Community</h2>
              </div>
            </div>
        	</div>
    		</section>

				<section id="services">
					<div className="container-fluid bg-primary pt-3 mt-5 p-5">
						<JobDeck jobs={this.state.jobs} />
					</div>
				</section>

				<section id="how-it-works">
					<div className="container">
						<div className="row">
							<div className="col">
								<h3 className="display-4 text-center">How it Works</h3>
							</div>
						</div>
						<div className="row">
							<div className="col mt-4">
								<p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi unde, possimus doloremque odio fugit, modi reprehenderit reiciendis laboriosam eius hic iusto recusandae ipsa labore impedit corporis explicabo perferendis repudiandae ad a architecto. Nesciunt vitae quibusdam molestiae, ipsa ut hic repellat corrupti totam deleniti accusantium sit nostrum assumenda! Quaerat dolore deleniti aperiam nesciunt quos ratione quae amet alias aut esse perspiciatis ipsam odit maiores assumenda voluptatem numquam, adipisci, magnam autem dolor. Repellendus similique ullam odit facilis nesciunt, accusamus error optio alias officiis consectetur hic veniam laboriosam asperiores quis dolorum placeat vitae fuga obcaecati architecto eos explicabo velit delectus! Molestiae, numquam suscipit?</p>
								<p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam expedita necessitatibus quam, voluptatum ea error perferendis aperiam dolore libero minus soluta, vero facilis rem ad architecto! Aliquid atque ullam possimus minus vel modi hic, reiciendis totam, laborum debitis ut blanditiis sit nihil sed ex rem delectus natus, fugiat eum?</p>
							</div>
						</div>
					</div>
				</section>

				<section id="advantages" className="bg-light">
					<div className="container">
						<div className="row mb-4">
							<div className="col">
								<h3 className="display-4 text-center">Advantages</h3>
							</div>
						</div>
						<div className="row">
							<div className="col-4 text-right">
								<i style={{color: '#27ae60'}} className="fas fa-money-bill-wave fa-4x"></i>
							</div>
							<div className="col-8 pl-5 mb-4">
								<h3 className="display-5">Cheap</h3>
								<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam sequi quos praesentium sint, exercitationem deleniti illo ea obcaecati mollitia dignissimos.</p>
							</div>
						</div>
						<div className="row">
							<div className="col-4 text-right">
								<i style={{color: "#9b59b6"}} className="fas fa-network-wired fa-4x"></i>
							</div>
							<div className="col-8 pl-5 mb-4">
								<h3 className="display-5">Community Centric</h3>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aspernatur necessitatibus odit dolor at debitis voluptates tempore ullam ipsa commodi!</p>
							</div>
						</div>
						<div className="row">
							<div className="col-4 text-right">
								<i style={{color: "#2c3e50"}} className="fab fa-jedi-order fa-4x mr-3"></i>
							</div>
							<div className="col-8 pl-5 mb-4">
								<h3 className="display-5">Backed by the Jedi Order</h3>
								<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus vitae id aliquid eligendi aperiam autem atque neque eum, temporibus, laborum laboriosam facere! Similique vitae sit aliquid aspernatur explicabo inventore enim!</p>
							</div>
						</div>
					</div>
				</section>
		</div>
		)
	}
}