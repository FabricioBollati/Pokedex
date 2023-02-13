import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import ImageColors from 'react-native-image-colors';

import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

interface Props {
  pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const navigation = useNavigation();

  const isMounted = useRef(true);

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {fallback: 'grey'}).then(colors => {
      if (!isMounted.current) return;

      switch (colors.platform) {
        case 'android':
          // android colors properties
          setBgColor(colors.dominant || 'grey');
          break;
        case 'web':
          // web colors properties
          setBgColor(colors.lightVibrant || 'grey');
          break;
        case 'ios':
          // iOS colors properties
          setBgColor(colors.primary || 'grey');

          break;
        default:
          throw new Error('Unexpected platform key');
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    // <View>
    //   <Text>{pokemon.name}</Text>
    //   <FadeInImage
    //     uri={pokemon.picture}
    //     style={{
    //       height: 100,
    //       width: 100,
    //     }}
    //   />
    // </View>
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={{...styles.name}}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -0,
    right: -0,
    overflow: 'hidden',
    opacity: 0.4,
  },
});
