import { Grid, Box, CircularProgress, Typography } from '@mui/joy';
import MenuBar from '../components/MenuBar';
import SimpleBarChart from '../components/BarChart';
import StackedBarChart from '../components/StackedBarChart';
import { useEffect, useState } from 'react';
import { getMemberStats, getAvgAllMemberStats } from '../api/getStats';
import axios from 'axios';
import { MemberStat } from '../types/MemberStats';
import WelcomeHeader from '../components/WelcomeHeader.tsx';
import StatContainer from '../components/StatContainer.tsx';
import StreakContainer from '../components/StreakContainer.tsx';
import BarTitleContainer from '../components/BarTitleContainer.tsx';

export default function UserPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<MemberStat[]>([]);
  const [avgStats, setAvgStats] = useState<MemberStat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [avgError, setAvgError] = useState<string | null>(null);
  const [percentile, setPercentile] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    const fetchMemberStats = async () => {
      const email = localStorage.getItem('email') || '';
      setUserName(email.split('@')[0]);

      try {
        setIsLoading(true);
        setError(null);

        const data = await getMemberStats(email);
        setStats(data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          setError(
            err.response.data?.message || 'Error fetching member statistics'
          );
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAvgMemberStats = async () => {
      try {
        setIsLoading(true);
        setAvgError(null);

        const data = await getAvgAllMemberStats();
        setAvgStats(data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          setAvgError(
            err.response.data?.message ||
              'Error fetching average member statistics'
          );
        } else if (err instanceof Error) {
          setAvgError(err.message);
        } else {
          setAvgError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchMemberStats(), fetchAvgMemberStats()]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (stats.length > 0 && avgStats.length > 0) {
      const userTotal = stats.reduce((sum, stat) => sum + stat.count, 0);
      const allUserTotal = avgStats.reduce(
        (sum, stat) => sum + (stat.averageUsage ?? 0),
        0
      );

      if (allUserTotal === 0) {
        setPercentile(0);
        return;
      }

      let percentile = (userTotal / allUserTotal) * 100;
      percentile = Math.min(Math.max(percentile, 0), 100);

      setPercentile(parseFloat(percentile.toFixed(2)));
    }
  }, [stats, avgStats]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (error) {
    return (
      <>
        <MenuBar />
        <Box sx={{ p: 3 }}>
          <Typography color="danger" level="h4">
            {error}
          </Typography>
        </Box>
      </>
    );
  }

  if (avgError) {
    return (
      <>
        <MenuBar />
        <Box sx={{ p: 3 }}>
          <Typography color="danger" level="h4">
            {avgError}
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <MenuBar />
      <Box sx={{ p: 3 }}>
        <WelcomeHeader title={`Hi, ${userName}`} />
        <Box sx={{ mt: 3 }}>
          <Grid
            container
            spacing={5}
            columns={2}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <Grid xs={12} md={4} sx={{ display: 'flex', gap: 3 }}>
              <StreakContainer value={stats.length} height={200} />
              <StatContainer
                value={percentile !== null ? 100 - percentile : 0}
                height={200}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <BarTitleContainer title="Daily Thread Count" height={500}>
            <SimpleBarChart data={stats} />
          </BarTitleContainer>
        </Box>

        <Box sx={{ mt: 3 }}>
          <BarTitleContainer title="Global Usage Average" height={600}>
            <StackedBarChart individualData={stats} averageData={avgStats} />
          </BarTitleContainer>
        </Box>
      </Box>
    </>
  );
}
