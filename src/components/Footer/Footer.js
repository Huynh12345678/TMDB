import '../../scss/components/Footer.scss'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="single_column movie header_large">
            <nav className='container'>
                <div className="join">
                    <Link to='/' className='pl-0'><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="The Movie Database (TMDb)" width={130} height={94} /></Link>
                    <Link className="rounded" to="/signup">Join the Community</Link>
                </div>
                <div>
                    <h3>The Basics</h3>
                    <ul>
                        <li><Link to="#">About TMDb</Link></li>
                        <li><Link to="#">Contact Us</Link></li>
                        <li><Link to="#">Support Forums</Link></li>
                        <li><Link to="#">API</Link></li>
                        <li><Link to="#" target="_blank" rel="noopener">System Status</Link></li>
                    </ul>
                </div>
                <div>
                    <h3>Get Involved</h3>
                    <ul>
                        <li><Link to="#">Contribution Bible</Link></li>
                        <li><Link to="#">3rd Party Applications</Link></li>
                        <li><Link to="#">Add New Movie</Link></li>
                        <li><Link to="#">Add New TV Show</Link></li>
                    </ul>
                </div>
                <div>
                    <h3>Community</h3>
                    <ul>
                        <li><Link to="#">Guidelines</Link></li>
                        <li><Link to="#">Discussions</Link></li>
                        <li><Link to="#">Leaderboard</Link></li>
                        <li><Link to="" target="_blank" rel="noopener">Twitter</Link></li>
                    </ul>
                </div>
                <div>
                    <h3>Legal</h3>
                    <ul>
                        <li><Link to="#">Terms of Use</Link></li>
                        <li><Link to="#">API Terms of Use</Link></li>
                        <li><Link to="#">Privacy Policy</Link></li>
                    </ul>
                </div>
            </nav>
            <section>Build 68f56ea (685)</section>
        </footer>
    );
};

export default Footer;