import '../../src/App.css' 
import BankAccounts from './BankAccounts';

function Home(){
    return <div>
        <div id = "row-container">
        <div className="column">
            <BankAccounts/>
        </div>
        <div className="column">two</div>
        <div className="column">three</div>
    </div>;
    </div>
    
        
}

export default Home; 