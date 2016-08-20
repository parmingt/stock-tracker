
var StockList = React.createClass({
    getInitialState: function(){
        var stocks = this.props.stocks;
        return {stocks:stocks};
    },
    inputSymbol: function(event){
        this.setState({newSymbol: event.target.value});
    },
    addNewSymbol: function(){
        console.log('clicked');
        var newStock = {'symbol': this.state.newSymbol}
        this.setState({stocks: this.state.stocks.concat([newStock])});
    },
    update: function(){
        this.state.stocks.forEach(function(stock){
            console.log(stock);
            getQuote(stock, function(data){
                stock["name"] = data.name;
            })
        })
    },
    render: function(){
        var stocks = this.state.stocks;
        return (
            <div>
                <input value={this.state.newSymbol} onChange={this.inputSymbol} />
                <button onClick={this.addNewSymbol}>Add</button>
                <button onClick={this.update}>Update</button>
                <ul>
                    {stocks.map(function(stock){
                        return <StockBox stock={stock} />
                    })}
                </ul>
            </div>
        );
    }
})

var StockBox = React.createClass({
    getInitialState: function(){
        var symbol = this.props.stock.symbol;
        console.log(symbol);
        var name = this.props.stock.name;
        console.log(name);
        return {symbol:symbol, name:name}
    },
    render: function(){
        return (
            <h1>{this.state.symbol}</h1>
            )
    }
})

var destination = document.querySelector("#container");

ReactDOM.render(<StockList stocks={[{symbol:"MSFT"},{symbol:"AAPL"}]} />, destination);