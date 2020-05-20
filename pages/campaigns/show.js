import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends React.Component {
   static async getInitialProps(props) {
     const getQueryAddress = props.query.address;
     const campaign = Campaign(getQueryAddress);
		 const summary = await campaign.methods.getSummary().call();
     return {
       address: props.query.address,
       minimumContribution: web3.utils.hexToNumber(summary[0]._hex),
       balance: web3.utils.hexToNumber(summary[1]._hex),
       requestsCount: web3.utils.hexToNumber(summary[2]._hex),
       approversCount: web3.utils.hexToNumber(summary[3]._hex),
       manager: summary[4]
     };
	 }

   renderCards() {
     const {
       balance,
       manager,
       minimumContribution,
       requestsCount,
       approversCount
     } = this.props;

     const items = [
       {
         header: manager,
         meta: 'Address of Manager',
         description: 'The manager created this campaign, and can create requests to withdraw funds',
         style: { overflowWrap: 'break-word' }
       },
       {
         header: minimumContribution,
         meta: 'Minimum Contribution (wei)',
         description: 'You must contributed to become approver'
       },
       {
         header: requestsCount,
         meta: 'Number of Requests',
         description: 'A request tries to withdraw money from the contract. Request must be approved'
       },
       {
         header: approversCount,
         meta: 'Number of Approvers',
         description: 'Number of people who have donated to this campaign'
       },
       {
         header: web3.utils.fromWei(web3.utils.toBN(balance), 'ether'),
         meta: 'Campaign Balance (ether)',
         description: 'The balance (funds) of the campaign'
       }
     ];

     return <Card.Group items={ items } />;
   }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              { this.renderCards() }
            </Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={ this.props.address } />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${ this.props.address }/requests` }>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
