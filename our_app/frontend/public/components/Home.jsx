import '../../src/App.css' 
import BankAccounts from './BankAccounts';
import BankAccountsList from './BankAccountsList';
import Balances from './Balances';

function Home(){
    return (<div>
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