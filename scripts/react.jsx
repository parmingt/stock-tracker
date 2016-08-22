
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
        var duplicate = false;
        var newSymbol = this.state.newSymbol;
        this.state.stocks.forEach(function(stock){ //check for duplicates
            if(stock.symbol === newSymbol){
                duplicate = true;
                return;
            }
        });
        if(!duplicate){ //add symbol to array, clear input field, rerender
            var newStock = {'symbol': this.state.newSymbol}
            getStockData(newStock, function(){
                this.setState({stocks: [newStock].concat(this.state.stocks)})
                $('#stockInput').val('');
            }.bind(this));
        }
    },
    update: function(){
        this.state.stocks.forEach(function(stock){
            getStockData(stock, function(){
                this.setState({});
            }.bind(this));
        }.bind(this));
    },
    render: function(){
        var stocks = this.state.stocks;
        return (
            <div>
                <div className='form-inline'>
                    <input id='stockInput' className='form-control' onChange={this.inputSymbol} placeholder='Add symbol...'/>
                    <button onClick={this.addNewSymbol} className='btn btn-success'>Add</button>
                    <button onClick={this.update} id='updateButton' className='btn btn-default'>Update</button>
                </div>
                <div className='row'>
                    {stocks.map(function(stock){
                        return <StockBox stock={stock} key={stock.symbol}/>
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
                <div className='stockBox'>
                    <h1>{stock.symbol}</h1>
                    <h5>{stock.name}</h5>
                    <p>Last priced  {stock.lastData[0]} at ${stock.lastData[4]}</p> 
                </div>
            </div>
            )
        } else {
            return (<div></div>)
        }}
    }
})

var destination = document.querySelector("#container");

ReactDOM.render(<StockList stocks={[{symbol:"MSFT"},{symbol:"AAPL"}]} />, destination);