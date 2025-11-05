import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1rem;
`;

export const MonthSection = styled.section`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
`;

export const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const MonthTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 600;
  font-size: 1.25rem;
  color: #111;
  text-transform: capitalize;
`;

export const AccentBar = styled.div`
  width: 6px;
  height: 24px;
  border-radius: 4px;
  background: linear-gradient(90deg, #4f46e5, #6366f1);
`;

export const ReportCount = styled.span`
  color: #6b7280;
  font-size: 0.9rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
  margin-top: 1rem;
`;
