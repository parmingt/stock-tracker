
var StockList = React.createClass({
    getInitialState: function(){
        var symbolsInput = this.props.stocks;
        var stocks = [];
        symbolsInput.forEach(function(symbol){
           stocks.push(new Stock(symbol)) ;
        });
        return {stocks:stocks, units:'%'};
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
            var newStock = new Stock(this.state.newSymbol);
            getStockData(newStock, function(){
                this.setState({stocks: [newStock].concat(this.state.stocks)})
                this.chartDates();
                $('#stockInput').val('');
            }.bind(this));
        }
    },
    update: function(){
        this.state.stocks.forEach(function(stock){
            getStockData(stock, function(){
                this.setState({});
                this.chartDates();
            }.bind(this));
        }.bind(this));
    },
    chartDates: function(){
        // var dates = ['2016-08-22','2016-08-16','2016-08-17','2016-08-18','2016-08-19'];
        var dates = getLastWeekDates();
        var units = this.state.units;
        var dataSeries = [];
        this.state.stocks.forEach(function(stock){
            var priceArray = getDataForChart(units,dates,stock);
            dataSeries.push({name: stock.symbol, data:priceArray});
        });
        makeChart(dates, dataSeries);
    },
    changeUnits: function(event){
        this.setState({units: event.target.value},function(){
            this.chartDates();
        });
    },
    handleRemoveStock: function(index){
        var newStocks = this.state.stocks;
        newStocks.splice(index,1);
        this.setState({stocks: newStocks}, function(){
            this.chartDates();
        });  
    },
    render: function(){
        var stocks = this.state.stocks;
        return (
            <div>
                <div className='form-inline'>
                    <input id='stockInput' className='form-control' onChange={this.inputSymbol} placeholder='Add symbol...'/>
                    <button onClick={this.addNewSymbol} className='btn btn-success'>Add</button>
                    <button onClick={this.update} id='updateButton' className='btn btn-default'>Update</button>
                    <select id='display-units' onChange={this.changeUnits}>
                        <option>%</option>
                        <option>$</option>
                    </select>
                </div>
                <div className='row'>
                    {stocks.map(function(stock, index){
                        return <StockBox stock={stock} key={stock.symbol} index={index} handleRemoveStock={this.handleRemoveStock}/>
                    }.bind(this))}
                </div>
            </div>
        );
    }
})

var StockBox = React.createClass({
    handleRemoveStock: function(){
        this.props.handleRemoveStock(this.props.index);
        return false;
    },
    render: function(){
        var stock = this.props.stock;
        {if(stock.data.length > 0) {
            var lastPriceTime = moment(stock.data[0][0]).format('MMM Do');
            return (
                <div className='col-sm-6' >
                    <div className='stockBox'>
                        <span type="button"  className="glyphicon glyphicon-remove"onClick={this.handleRemoveStock}></span>
                        <h1>{stock.symbol}</h1>
                        <h5>{stock.name}</h5>
                        <p>Last closed {lastPriceTime} at ${stock.data[0][4]}</p> 
                        
                    </div>
                </div>
                )
        } else {
            return (<div></div>)
        }}
    }
})

var destination = document.querySelector("#container");

ReactDOM.render(<StockList stocks={["MSFT","AAPL"]} />, destination);