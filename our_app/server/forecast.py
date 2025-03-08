from flask import Flask, request, jsonify 
from flask_cors import CORS
import pandas as pd 
import pmdarima as pm 


app = Flask(__name__) 
CORS(app)
''
print(f'app listening')
@app.route('/forecast', methods = ['POST'])
def forecast_transactions():
    try:
        data = request.json['transactions']
        #print(f'data is {data}')
        df = pd.DataFrame(data)
        print(f'head is {df.head(3)}')
        df['date'] = pd.to_datetime(df['date'])
        df = df.sort_values(by='date') 
        
        df_resampled = df.set_index('date').resample('D').sum().fillna(0)

        SARIMAX_model = pm.auto_arima(
            df_resampled['amount'],
            start_p =1, start_q=1, test = 'adf',
            max_p = 12, max_q = 12, m = 7, 
            seasonal = True, d = None, D = 1,
            trace = True, error_action = 'ignore', suppress_warnings=True,
            stepwise = True
        )

        n_periods = 365 
        forecast_dates = pd.date_range(df_resampled.index[-1],periods = n_periods, freq = 'D')
        print(f'after initializing forecast_dates')
        fitted, conf = SARIMAX_model.predict(n_periods=n_periods, return_conf_int = True)
        print(f'after fitting to sarimax model')

        forecast_df = pd.DataFrame({'date':forecast_dates, 'amount': fitted})
        print(f'forecast df is {forecast_df.head(3)}')
        forecast_df.set_index('date',inplace = True)

        forecast_json = forecast_df.reset_index().to_json(orient='records',date_format = 'iso')
        print(f'forecast data json is {forecast_json}')
        return jsonify({"forecast": forecast_json}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

app.run(debug = False, host='localhost', port = 5000)