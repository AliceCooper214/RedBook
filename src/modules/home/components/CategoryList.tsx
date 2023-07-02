import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

import CategoryModal, {CategoryModalRef} from '../components/CategoryModal';
import {TouchableOpacity} from 'react-native-gesture-handler';

import icon_arrow from '../../../assets/icon_arrow.png';

type Props = {
  categoryList: Category[];
  allCategoryList: Category[];
  onCategoryChange: (category: Category) => void;
};

export default ({categoryList, allCategoryList, onCategoryChange}: Props) => {
  const modelRef = useRef<CategoryModalRef>(null);

  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    setCategory(categoryList.find(i => i.name === '推荐'));
  }, [categoryList]);

  const onCategoryPress = (c: Category) => {
    setCategory(c);
    onCategoryChange?.(c);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {categoryList.map((item: Category) => {
          const isSelected = item.name === category?.name;
          return (
            <TouchableOpacity
              key={`${item.name}`}
              style={styles.tabItem}
              onPress={() => onCategoryPress(item)}>
              <Text
                style={
                  isSelected ? styles.tabItemTxtSelected : styles.tabItemTxt
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          modelRef.current?.show();
        }}>
        <Image style={styles.openImg} source={icon_arrow} />
      </TouchableOpacity>

      <CategoryModal ref={modelRef} categoryList={allCategoryList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 6,
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  openButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openImg: {
    width: 18,
    height: 18,
    transform: [{rotate: '-90deg'}],
  },
  tabItem: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemTxt: {
    fontSize: 16,
    color: '#999',
  },
  tabItemTxtSelected: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});
