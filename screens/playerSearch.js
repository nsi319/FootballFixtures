import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';

class leaguesSearch extends Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: this.props.route.params.players,

        };
        this.arrayholder = this.props.route.params.players;
        if (!this.arrayholder) {
            this.state.error("Error")
        }
    }
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            return item.player_name.includes(text);
        });
        this.setState({
            data: newData,
        });
    };

    renderHeader = () => {
        return (
            <SearchBar style={styles.search}
                placeholder="Search for a Player..."
                round
                lightTheme
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}

            />
        );
    };
    get_initial = name => {
        var matches = name.match(/\b(\w)/g);
        var acronym = matches.join('');
        return acronym;

    }
    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        if (this.state.error) {
            return (
                <View style={styles.error}><Text >NO PLAYERS FOUND</Text></View>
            )
        }
        const badge = this.props.route.params.badge;
        console.log(badge);
        const name = this.props.route.params.name;
        return (

            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (

                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('playerDetails', { player: item, name: name, badge: badge })}>
                            <ListItem
                                leftAvatar={{ title: item.player_name.match(/\b(\w)/g).join('') }}
                                title={<Text style={styles.list}>{item.player_name.toUpperCase()}</Text>}
                                chevron={{ color: 'black' }}


                            />
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={item => item.player_name}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>

        );
    }
}
const styles = StyleSheet.create({
    list: {
        fontSize: 17,
        color: '#E88223'


    },

    error: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,

    }
})
export default leaguesSearch;