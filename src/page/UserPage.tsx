import { Grid, Box, CircularProgress, Typography } from '@mui/joy';
import Container from '../components/Container';
import MenuBar from '../components/MenuBar';
import SimpleBarChart from '../components/BarChart';
import StackedBarChart from '../components/StackedBarChart';
import { useEffect, useState } from 'react';
import { getMemberStats, getAvgAllMemberStats } from '../api/getStats';
import axios from 'axios';
import { MemberStat } from '../types/MemberStats';

export default function UserPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<MemberStat[]>([]);
  const [avgStats, setAvgStats] = useState<MemberStat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [avgError, setAvgError] = useState<string | null>(null);
  const [percentile, setPercentile] = useState<number | null>(null);

  useEffect(() => {
    const fetchMemberStats = async () => {
      const email = 'test@email.com';

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
      console.log(userTotal);
      const allUserTotal = avgStats.reduce(
        (sum, stat) => sum + (stat.averageUsage ?? 0),
        0
      );
      if (allUserTotal === 0) {
        setPercentile(0);
        return;
      }
      const percentile = (userTotal / allUserTotal) * 100;
      setPercentile(Math.round(percentile));
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
        <Container title={`Hi, User`} />

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
              <Container title="Did you KNOW??" height={200}>
                <Typography>
                  You have {stats.length} days of usage data.
                </Typography>
              </Container>
              <Container title="Your GPT Usage Rank" height={200}>
                <Typography>
                  You are in the top{' '}
                  {percentile !== null ? 100 - percentile : '...'}% of users.
                </Typography>
              </Container>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Container
            title="Daily Usage"
            body="Your usage over the past week."
            height={400}
          >
            <SimpleBarChart data={stats} />
          </Container>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Container
            title="Average Engagement Metrics (All Members)"
            body="Detailed average engagement metrics across all members."
            height={500}
          >
            <StackedBarChart individualData={stats} averageData={avgStats} />
          </Container>
        </Box>
      </Box>
    </>
  );
}
