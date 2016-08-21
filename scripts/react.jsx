
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
        this.setState({stocks: [newStock].concat(this.state.stocks)}, function(){ //add new stock to beginning of array
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
                <div className='form-input' id='stockInput'>
                    <input className='form-input' value={this.state.newSymbol} onChange={this.inputSymbol} placeholder='Add symbol...'/>
                    <button onClick={this.addNewSymbol}>Add</button>
                    <button onClick={this.update}>Update</button>
                </div>
                <div className='row'>
                    {stocks.map(function(stock){
                        return <StockBox stock={stock} />
                    })}
                </div>
            </div>
        );
    }
})

var StockBox = React.createClass({
    render: function(){
        var stock = this.props.stock;
        {if(stock.lastData) {
        return (
            <div className='col-sm-6' >
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