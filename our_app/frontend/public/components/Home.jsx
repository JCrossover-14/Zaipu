import '../../src/App.css' 
import BankAccounts from './BankAccounts';
import BankAccountsList from './BankAccountsList';
function Home(){
    return (<div>
        <div id = "row-container">
        <div className="column">
            one
        </div>
        <div className="column">two</div>
        <div className="column"><BankAccountsList/></div>
    </div>
    </div>);
    
        
}

export default Home; 