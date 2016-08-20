
var StockList = React.createClass({
    getInitialState: function(){
        var symbols = this.props.symbols;
        return {symbols:symbols};
    },
    inputSymbol: function(event){
        this.setState({newSymbol: event.target.value});
    },
    addNewSymbol: function(){
        console.log('clicked');
        this.setState({symbols: this.state.symbols.concat([this.state.newSymbol])});
        console.log(this.state.newSymbol);
        console.log(this.state.symbols);
    },
    render: function(){
        var name="Stocks"
        var symbols = this.state.symbols;
        return (
            <div>
                <input value={this.state.newSymbol} onChange={this.inputSymbol} />
                <button onClick={this.addNewSymbol}>Add</button>
                <ul>
                    {symbols.map(function(symbol){
                        return <li>{symbol}</li>
                    })}
                </ul>
            </div>
        );
    }
})

var destination = document.querySelector("#container");

ReactDOM.render(<StockList symbols={["MSFT","AAPL"]} />, destination);