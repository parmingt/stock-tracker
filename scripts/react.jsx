
var StockList = React.createClass({
    getInitialState: function(){
        var stocks = this.props.stocks;
        return {stocks:stocks};
    },
    componentDidMount: function(){
        this.update();
    },
    inputSymbol: function(event){
        this.setState({newSymbol: event.target.value});
    },
    addNewSymbol: function(){
        var newStock = {'symbol': this.state.newSymbol}
        this.setState({stocks: this.state.stocks.concat([newStock])}, function(){
            this.update();
        });
        
    },
    update: function(){
        this.state.stocks.forEach(function(stock){
            getQuote(stock, function(data){
                stock["name"] = data.name;
                stock["lastData"] = data.data[0];
                this.setState({});
            }.bind(this));
        }.bind(this));
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
    render: function(){
        var stock = this.props.stock;
        {if(stock.lastData) {
        return (
            <div>
                <h1>{stock.symbol}</h1>
                <h5>{stock.name}</h5>
                <p>Last priced  {stock.lastData[0]} at ${stock.lastData[4]}</p> 
            </div>
            )
        } else {
            return (<div></div>)
        }}
    }
})

var destination = document.querySelector("#container");

ReactDOM.render(<StockList stocks={[{symbol:"MSFT"},{symbol:"AAPL"}]} />, destination);