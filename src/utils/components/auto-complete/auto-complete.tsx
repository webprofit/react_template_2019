import * as React from 'react';
import '/autocomplete.css';
import Autosuggest, { SuggestionsFetchRequestedParams, SuggestionSelectedEventData, ChangeEvent } from 'react-autosuggest';
import { User } from 'COMMON/entities/User';
import DataService from 'COMMON/data-service/DataService';
import MenuItem from '@material-ui/core/MenuItem';


interface IAutoCompleteProps {
    url: string;
    value: any;
    filter?: string;
    order?: string;
    oDataQuery?: string;
    placeholder?: string;
    label?: string;
    onSelected: (item: User) => void;
    // onChange?: () => void;
    // clearData?: (clearData: () => void) => void;
}

interface IAutoCompleteState {
    dataFound: boolean
    isLoadData: boolean;
    value: any,
    suggestions: User[],
}



export default class AutoComplete extends React.Component<IAutoCompleteProps, IAutoCompleteState> {
    userSvc: DataService<User>;
    private timer: number;

    constructor(props: IAutoCompleteProps) {
        super(props)

        this.state = {
            dataFound: true,
            isLoadData: false,
            suggestions: [],
            value: '',
        }
    }



    componentDidMount() {
        this.setState({ value: this.props.value })
        if (this.props.url) {
            this.userSvc = new DataService(this.props.url);
        }
    }

    onChange = (event: React.FormEvent<HTMLInputElement>, { newValue }: ChangeEvent) => {
        if (newValue.length < 2) {
            this.setState({ isLoadData: false, value: newValue, dataFound: true });
        } else {
            this.setState({ value: newValue });
        }
    };

    onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
        let _filterStr = '';
        const words = value.split(' ');
        let fName = '';
        words.forEach((w: string) => {
            if (w) {
                if (fName) { fName += ' and '; }
                fName += `contains(Firstname, '${w}') or contains(LastName, '${w}')`;
            }
        });
        _filterStr += `(${fName})`;

        const str = {
            filter: `${this.props.filter} and ${_filterStr}`,
            order: this.props.order,
            oDataQuery: this.props.oDataQuery ? `&$ ${this.props.oDataQuery}` : ''
        };

        if (this.timer != null) {
            window.clearTimeout(this.timer);
            this.setState({ isLoadData: false })
        }
        this.setState({ isLoadData: true }, () => {
            this.timer = window.setTimeout(() => {
                this.userSvc.query(str)
                    .then((data: User[]) => {
                        let _dataFound: boolean = true;
                        let _isLoadData: boolean = true;
                        if (data && data.length > 0) {
                            _isLoadData = false;
                        } else {
                            _isLoadData = false;
                            _dataFound = false;
                        }
                        this.setState({ suggestions: data, dataFound: _dataFound, isLoadData: _isLoadData });
                        this.timer = null;
                    })
            }, 1000)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    onSuggestionSelected = (event: React.FormEvent<HTMLInputElement>, { suggestion }: SuggestionSelectedEventData<User>) => {
        this.props.onSelected(suggestion)
    }

    getSuggestionValue = (suggestion: User) => {
        return `${suggestion.firstName} ${suggestion.lastName}`;
    }

    renderSuggestion = (suggestion: User) => {
        return (
            <MenuItem component="div">
                {`${suggestion.firstName} ${suggestion.lastName}`}
            </MenuItem>
        )
    }

    shouldRenderSuggestions = (value: string) => {
        return value.trim().length > 1
    }

    onKeyPress = (e: any) => {
        if (e.which == 13) {
            e.preventDefault();
        }
    }


    render() {

        const inputProps = {
            placeholder: this.props.placeholder ? this.props.placeholder : 'User name',
            value: this.state.value || '',
            onChange: this.onChange,
            onKeyPress: this.onKeyPress,
        };

        return (
            <div className="react-autosuggest__container">
                {
                    this.state.isLoadData ?
                        <div className="info-loading"> Loading...  </div>
                        : this.state.dataFound ? null : <div className="info-loading"> No data found  </div>
                }
                {
                    this.props.label ?
                        <label className={`${this.state.value ? 'active-label' : ''}`}>{this.props.label}</label>
                        : null
                }
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    shouldRenderSuggestions={this.shouldRenderSuggestions}
                    alwaysRenderSuggestions={false}
                />
            </div>
        )
    }


}