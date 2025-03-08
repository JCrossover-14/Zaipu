import '../../src/App.css' 
import BankAccounts from './BankAccounts';
import BankAccountsList from './BankAccountsList';
import Balances from './Balances';
import Navbar from './Navbar';

function Home(){
    return (<div id = "container">
        <Navbar/>
        <div id = "row-container">
            <div className="column">
                <Balances/>
            </div>
            <div className="column">two</div>
            <div className="column"><BankAccountsList/></div>
        </div>
    </div>);
    
        
}

export default Home; 