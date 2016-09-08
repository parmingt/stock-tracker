
var StockList = React.createClass({
    getInitialState: function(){
        return {stocks:[], units:'%', timeFrame:'week'}
    },
    componentDidMount: function(){
        getServerSymbols(function(symbols){
            symbols.forEach(function(symbol){
                this.state.stocks.push(new Stock(symbol));
            }.bind(this));
            this.update();
        }.bind(this));
    },
    inputSymbol: function(event){
        this.setState({newSymbol: event.target.value});
    },
    update: function(){
        getAllStockData(this.state.stocks, function(){
            //this.setState({}); //maybe not necessary
            this.chartDates();
        }.bind(this));
    },
    chartDates: function(){
        var dates = getChartDates(this.state.timeframe);
        var units = this.state.units;
        
        var dataSeries = [];
        this.state.stocks.forEach(function(stock, index){
            var priceArray = getDataForChart(units,dates,stock);
            var className = 'line line-' + index;
            dataSeries.push({name: stock.symbol, className:className, data:priceArray});
        });
        dates.forEach(function(date, index){
            dates[index] = moment(date).format('MMM Do');
        })
        makeChart(dates, dataSeries);
        this.setState({}, function(){
            addHoverListeners(this.state.stocks);
        });
    },
    changeUnits: function(event){
        this.setState({units: event.target.value},function(){
            this.chartDates();
        });
    },
    changeTimeframe: function(event){
        this.setState({timeframe: event.target.value},function(){
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
    handleSubmit: function(event){
        event.preventDefault();
        var submitSymbol = this.state.newSymbol;
        
        //update local list
        var newStock = new Stock(submitSymbol);
        getStockData(newStock, function(){
            this.state.stocks.push(newStock);
            this.chartDates();
        }.bind(this));
        
        //update server list
        var submitData = {'symbol':submitSymbol}
        addServerSymbol(submitData);
    },
    render: function(){
        var stocks = this.state.stocks;
        return (
            <div>
                <form id='new-symbol-form' className='form-inline' onSubmit={this.handleSubmit}>
                    <input id='stockInput' name='newSymbol' className='form-control' onChange={this.inputSymbol} placeholder='Add symbol...'/>
                    <button onClick={this.addNewSymbol} className='btn btn-success' type='submit'>Add</button>
                    <button onClick={this.update} id='updateButton' className='btn btn-default'>Update</button>
                    <select id='display-units' onChange={this.changeUnits} className='form-control'>
                        <option>%</option>
                        <option>$</option>
                    </select>
                    <select id='display-timeframe' onChange={this.changeTimeframe} className='form-control'>
                        <option value='week'>Past Week</option>
                        <option value='month'>Past Month</option>
                        <option value='year'>Past Year</option>
                    </select>
                </form>
                <div className='row'>
                    {stocks.map(function(stock, index){
                        return <StockBox stock={stock} key={stock.symbol} index={index} handleRemoveStock={this.handleRemoveStock}/>
                    }.bind(this))}
                </div>
            </div>
        );
    }
});

var StockBox = React.createClass({
    handleRemoveStock: function(){
        this.props.handleRemoveStock(this.props.index);
        return false;
    },
    render: function(){
        var stock = this.props.stock;
        {if(stock.data.length > 0) {
            var lastPriceTime = moment(stock.data[0][0]).format('MMM Do');
            var boxStyle = {borderColor: stock.colorCode};
            var classList = "stockBox stock-" + this.props.index;
            return (
                <div className='col-sm-6' >
                    <div className={classList} style={boxStyle}>
                        <span type="button"  className="glyphicon glyphicon-remove" onClick={this.handleRemoveStock}></span>
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

ReactDOM.render(<StockList />, destination);
