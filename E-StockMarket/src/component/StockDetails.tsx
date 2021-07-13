import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import CellButton from './helpers/CellButton';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Box from '@material-ui/core/Box';
import { selectedCompany, setCompanies, fetchCompanies } from '../actions';
import Layout from './layout';
import Authenticate from './helpers/Authenticate';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Grid, Button, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { TextField, Radio } from 'final-form-material-ui';
import moment from 'moment'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			display: 'flex',
			justifyContent: 'flex-end',
		},
		test: {},
	})
);

const StockDetails = (props: any) => {
    const stock:any[] = new Array<any>();
	const [state, setState] = useState({
		stockList: new Array<any>(),
		error: null,
	});
	const [loading, setLoading] = useState(true);

	function Alert(props: AlertProps) {
		return <MuiAlert elevation={6} variant='filled' {...props} />;
	}
	const [open, setOpen] = React.useState(false);
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
    };
    
    

const classes = useStyles();
	useEffect((): any => {
		// props.fetchCompanies();
		// setState({
		// 	stockList: props.Companies,
		// 	error: null,
        // });
        const stocks: any[] = [{price: 100, date: '1-1-2020', time: '10:00'}, {price: 101, date: '1-1-2020', time: '11:00'}, {price: 102, date: '1-1-2020', time: '1:00'}];
        setState({
			stockList: stocks,
			error: null,
		});
		let isSubscribed = true;
		// const promise = axios.get('https://localhost:5001/Company/Companies');
		// promise
		// 	.then((value) => {
		// 		console.log('value',value)
		// 		if (isSubscribed) {
		// 			setState({
		// 				stockList: value.data,
		// 				error: null,
		// 			});
		// 		}
		// 		props.setCompanies(value.data);
		// 		setLoading(false);
		// 	})
		// 	.catch((error) => {
		// 		setOpen(true);
		// 		if (isSubscribed) {
		// 			setState({
		// 				stockList: [],
		// 				error: error,
		// 			});
		// 		}
		// 		setLoading(false);
		// 	});

		return () => (isSubscribed = false);
	}, []);

	const gridData: any = {
		columnDefs: [
			{ headerName: 'Stock Price', field: 'price', sortable: true },
			{ headerName: 'Date', field: 'date', sortable: true },
			{ headerName: 'Time', field: 'time' },
		],
    };
    
    let test = "test date";
    const [code, setCode] = React.useState('');
    const [name, setName] = React.useState('');
    const [min, setMin] = React.useState(0);
    const [max, setMax] = React.useState(0);
    const [avg, setAvg] = React.useState(0);

    function getCompanyDetails(){
        const headers = {
			'Content-Type': 'application/json',
		};
		const promise = axios.get('https://localhost:5001/Company/'+code, {
			headers,
		});

		promise
			.then((value) => {
                setName(value.data.name);
                getStockDetails();
                console.log(value);
			})
			.catch((error) => console.log(error) );
    }

    function getStockDetails(){
        const headers = {
			'Content-Type': 'application/json',
		};
		const promise = axios.get('https://localhost:5002/Stock/Stock?code='+code, {
			headers,
		});

		promise
			.then((value) => {
                setState({
                    stockList: value.data.map((s: any)=>
                        {
                            console.log(s.date);
                            console.log(moment(s.date).format('DD/MM/YYYY'));
                            const data = {price:s.price, date: moment(s.date).format('DD/MM/YYYY'), time: moment(s.date).format('h:mm:ss')}

                            return data;
                        }),
                    error: null,
                });
                const data = value.data.map((m:any)=> m.price);
                setMin(Math.min(...data));
                setMax(Math.max(...data));
                const average = (arr:number[]) => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    
                setAvg(average(data)); // 5
			})
			.catch((error) => console.log(error) );
    }

    const handleChange = (e:any)=>{
        setCode(e.target.value);
    }
    function handleSearchClick() {
        getCompanyDetails();
    }

	return (
		<React.Fragment>
			<Layout props={props}>
				<div style={{ padding: 16, margin: 'auto', maxWidth: '70vw' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                    <div>
                        <label>Company Code:</label>
                        <input onChange={ handleChange }  type="text" id="code" name="code"></input>
                    </div>
                    <div>
                        <Button
                            variant='contained'
                            color='primary'
                            type='button'
                            onClick={handleSearchClick}
                            // disabled={submitting || isViewOnly}
                        >
                            Search
                        </Button>
				    </div>
                </div>

                <div style={{ display: 'flex' }}>
                    <div>
                        <label>Company Code:</label>
                        <input type="text" id="code1" name="code1" value={code} disabled></input>
                    </div>
                    <div>
                        <label>Company Name:</label>
                        <input type="text" id="name" name="name" value={name} disabled></input>
                    </div>
				</div>
				</div>
				
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                    <div>
                        <label>Min Price:</label>
                        <input type="text" value={min} disabled></input>
                    </div>
                    <div>
                        <label>Max Price:</label>
                        <input type="text" value={max} disabled></input>
                    </div>
                    <div>
                        <label>Avg Price:</label>
                        <input type="text" value={avg} disabled></input>
                    </div>
                </div>
				</div>
				<Box display='flex' justifyContent='center'>
					<div
						className='ag-theme-alpine'
						style={{ height: '520px', width: '50vw', marginTop: '20px' }}
					>
						<AgGridReact
							columnDefs={gridData.columnDefs}
							rowData={state.stockList}
							pagination={true}
							paginationPageSize={10}
						></AgGridReact>
					</div>
				</Box>
			</Layout>
			<Snackbar
				open={open}
				autoHideDuration={20000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={handleClose} severity='error'>
					<span>Something went wrong, Please Refresh the page</span>
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
};

const mapStateToProps = (state: any) => {
	const { company } = state;
	return {
		loading: company.loading,
		items: company.data,
		error: company.error,
		Companies: company.Companies,
	};
};

export default connect(mapStateToProps, {
	selectedCompany,
	setCompanies,
	fetchCompanies,
})(Authenticate(StockDetails));
