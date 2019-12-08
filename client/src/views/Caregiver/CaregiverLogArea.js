import React from 'react';

class CaregiverLogArea extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      checkinHr:'',
      checkinMin: '',
      checkinAmPm: 'AM',
      checkoutHr: '',
      checkoutMin: '',
      checkoutAmPm: 'AM'
    }
    this.handleCheckinHr = this.handleCheckinHr.bind(this);
    this.handleCheckinMin = this.handleCheckinMin.bind(this);
    this.handleCheckoutHr = this.handleCheckoutHr.bind(this);
    this.handleCheckoutMin = this.handleCheckoutMin.bind(this);
    this.handleOptionChangeIN = this.handleOptionChangeIN.bind(this);
    this.handleOptionChangeOUT = this.handleOptionChangeOUT.bind(this);
    this.handleCheckinSubmit = this.handleCheckinSubmit.bind(this);
  }

  handleCheckinHr = e => {
    this.setState({
      checkinHr: e.target.value
    });
  };

  handleCheckinMin = e => {
    this.setState({
      checkinMin: e.target.value
    });
  };

  handleCheckoutHr = e => {
    this.setState({
      checkoutHr: e.target.value
    });
  };

  handleCheckoutMin = e => {
    this.setState({
      checkoutMin: e.target.value
    });
  };

  handleOptionChangeIN = e => {
    this.setState({
      checkinAmPm: e.target.value
    });
  };

  handleOptionChangeOUT = e => {
    this.setState({
      checkoutAmPm: e.target.value
    });
  };

  handleCheckinSubmit = (e) => {
    e.preventDefault();

  }

  handleCheckoutSubmit = (e) => {
    e.preventDefault();

  }


    render() {
      return (
        <div className="checkin_out">
          {/* Checkin form */}
          <form className="form-inline" onSubmit={this.handleCheckinSubmit}>
            <div className="form-group">
              <label htmlFor="checkin-hour">Hr</label>
              <select className="form-control" id="checkin-hour" onChange={this.handleCheckinHr}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
            :
            <div className="form-group">
              <label htmlFor="checkin-minute">Min</label>
              <select className="form-control" id="checkin-minute" onChange={this.handleCheckinMin}>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
                <option>32</option>
                <option>33</option>
                <option>34</option>
                <option>35</option>
                <option>36</option>
                <option>37</option>
                <option>38</option>
                <option>39</option>
                <option>40</option>
                <option>41</option>
                <option>42</option>
                <option>43</option>
                <option>44</option>
                <option>45</option>
                <option>46</option>
                <option>47</option>
                <option>48</option>
                <option>49</option>
                <option>50</option>
                <option>51</option>
                <option>52</option>
                <option>53</option>
                <option>54</option>
                <option>55</option>
                <option>56</option>
                <option>57</option>
                <option>58</option>
                <option>59</option>
              </select>
            </div>
            {/* Checkin radio buttons */}
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="checkin-am"
                  value="AM"
                  checked={this.state.checkinAmPm === "AM"}
                  onChange={this.handleOptionChangeIN}
                  className="form-check-input"
                  defaultChecked
                />
                AM
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="checkin-PM"
                  value="PM"
                  checked={this.state.checkinAmPm === "PM"}
                  onChange={this.handleOptionChangeIN}
                  className="form-check-input"
                />
                PM
              </label>
            </div>

            <button type="submit" className="btn btn-primary">Check In</button>

          </form>

          {/* Checkout form */}
          <form className="form-inline" onSubmit={this.handleCheckoutSubmit}>
            <div className="form-group">
              <label htmlFor="checkout-hour">Hr</label>
              <select className="form-control" id="checkout-hour" onChange={this.handleCheckoutHr}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
            :
            <div className="form-group">
              <label htmlFor="checkout-minute">Min</label>
              <select className="form-control" id="checkout-minute" onChange={this.handleCheckoutMin}>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
                <option>32</option>
                <option>33</option>
                <option>34</option>
                <option>35</option>
                <option>36</option>
                <option>37</option>
                <option>38</option>
                <option>39</option>
                <option>40</option>
                <option>41</option>
                <option>42</option>
                <option>43</option>
                <option>44</option>
                <option>45</option>
                <option>46</option>
                <option>47</option>
                <option>48</option>
                <option>49</option>
                <option>50</option>
                <option>51</option>
                <option>52</option>
                <option>53</option>
                <option>54</option>
                <option>55</option>
                <option>56</option>
                <option>57</option>
                <option>58</option>
                <option>59</option>
              </select>
            </div>
            {/* Checkout radio buttons */}
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="checkout-am"
                  value="AM"
                  checked={this.state.checkoutAmPm === "AM"}
                  onChange={this.handleOptionChangeOUT}
                  className="form-check-input"
                />
                AM
              </label>
            </div>
            <div className="form-check">
              <label>
                <input
                  type="radio"
                  name="checkout-PM"
                  value="PM"
                  checked={this.state.checkouttAmPm === "PM"}
                  onChange={this.handleOptionChangeOUT}
                  className="form-check-input"
                />
                PM
              </label>
            </div>

            <button type="submit" className="btn btn-primary">Check Out</button>

          </form>
        </div>
      )
    }
}

export default CaregiverLogArea;
