import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

type FetchFunction<T> = () => Promise<T[]>;

const useAppWrite = <T,>(fetchFunction: FetchFunction<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetchFunction();
      setData(response ?? [])
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const refetch = () => fetchData();


  return { data, isLoading, refetch }
}

export default useAppWrite;
